import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import axios from "axios";
import User from "../../models/user";

dotenv.config();

const router = express.Router();

const discordClientId = process.env.DISCORD_CLIENT_ID;
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;
const discordUri = process.env.DISCORD_BOT_URI;
const discordRedirect = process.env.DISCORD_BOT_REDIRECT;

router.get('/services/discord/login', (req: Request, res: Response) => {
    console.log("Redirecting to Discord OAuth2");

    // Save user ID in the cookies
    res.cookie('user_id', req.query.user_id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
    
    if (!discordClientId || !discordClientSecret || !discordUri || !discordRedirect) {
        res.status(500).json({
            status: 'error',
            message: 'Discord OAuth2 credentials are not set',
        });
    }

    res.redirect(discordUri as string);
});

const oauth2FailedResponse = `
<html>
  <body>
    <script type="text/javascript">
      window.opener.postMessage('oauth2_failed', '*');
      window.close();
    </script>
    <p>Authorization failed. Window should close.</p>
  </body>
</html>
`;

const oauth2SuccessResponse = `
<html>
  <body>
    <script type="text/javascript">
      window.opener.postMessage('oauth2_success', '*');
      window.close();
    </script>
    <p>Authorization successful. Window should close.</p>
  </body>
</html>
`;

router.get('/services/discord/callback', async (req: Request, res: Response) => {
    const { code } = req.query;
  
    if (!code) {
        res.send(oauth2FailedResponse);
    }
  
    try {

      console.log("Exchanging code for access token");

      console.log(discordClientId);
      console.log(discordClientSecret);
      console.log(`Discord OAuth2 callback code: ${code}`);

      const formData = new URLSearchParams({
        client_id: discordClientId as string,
        client_secret: discordClientSecret as string,
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: discordRedirect as string,
      });

      const tokenResponse = await axios.post('https://discord.com/api/v10/oauth2/token',
        formData,
        {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
      );
          
      console.log(tokenResponse.data);

      const { access_token, refresh_token, token_type, expires_in } = tokenResponse.data;
      console.log(`Access token: ${access_token}`);
      console.log(`Refresh token: ${refresh_token}`);
      console.log(`Token type: ${token_type}`);
      console.log(`Expires in: ${expires_in}`);
  
      console.log(req.cookies);
      const user = await User.findById(req.cookies.user_id);
      if (!user) {
        res.send(oauth2FailedResponse);
        return;
      }

      console.log(user);
      const existingServiceIndex = user?.services.findIndex(service => service.key === 'discord');
      console.log(existingServiceIndex);
      if (existingServiceIndex >= 0) {
        console.log("Updating Discord service");
        user.services[existingServiceIndex].connected = true;
        user.services[existingServiceIndex].token = access_token;
        user.services[existingServiceIndex].refreshToken = refresh_token;

        await user.save();
        res.send(oauth2SuccessResponse);
      } else {
        res.send(oauth2FailedResponse);
      }  
  
    } catch (err: any) {
        console.log(err.message);
        res.send(oauth2FailedResponse);
    }
  });

export default router;
