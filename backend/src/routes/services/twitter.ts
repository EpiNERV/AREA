import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import axios from "axios";
import User from "../../models/user";
import TwitterApi from 'twitter-api-v2';

dotenv.config();

const router = express.Router();

const twitterClientId = process.env.TWITTER_CLIENT_ID;
const twitterClientSecret = process.env.TWITTER_CLIENT_SECRET;
const twitterUri = process.env.TWITTER_URI;
const twitterRedirect = process.env.TWITTER_REDIRECT;

router.get('/services/twitter/login', (req: Request, res: Response) => {
    console.log("Redirecting to Twitter OAuth2");

    // Save user ID in the cookies
    res.cookie('user_id', req.query.user_id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    if (!twitterClientId || !twitterClientSecret || !twitterUri || !twitterRedirect) {
        res.status(500).json({
            status: 'error',
            message: 'Twitter OAuth credentials are not set',
        });
        return;
    }
    
    const client = new TwitterApi({ clientId: twitterClientId, clientSecret: twitterClientSecret });
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(twitterRedirect, { scope: ['tweet.read', 'users.read', 'bookmark.write', 'offline.access'] });

    console.log(`Twitter OAuth2 URL: ${url}`);
    console.log(`Twitter OAuth2 code verifier: ${codeVerifier}`);
    console.log(`Twitter OAuth2 state: ${state}`);

    res.cookie('code_verifier', codeVerifier, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    res.redirect(url);
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

router.get('/services/twitter/callback', async (req: Request, res: Response) => {
    const { code } = req.query;
  
    let codeVerifier = req.cookies.code_verifier;
    if (!code || !codeVerifier) {
        res.send(oauth2FailedResponse);
        return;
    }
  
    try {
      console.log("Exchanging code for access token");

      const client = new TwitterApi({ clientId: twitterClientId as string, clientSecret: twitterClientSecret });

      client.loginWithOAuth2({ code: code as string, codeVerifier, redirectUri: twitterRedirect as string })
        .then(async ({ client: loggedClient, accessToken, refreshToken, expiresIn }) => {
          // {loggedClient} is an authenticated client in behalf of some user
          // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
          // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)
        
          console.log(`Twitter OAuth2 access token: ${accessToken}`);
          console.log(`Twitter OAuth2 refresh token: ${refreshToken}`);
          console.log(`Twitter OAuth2 expires in: ${expiresIn}`);

          console.log(req.cookies);
          const user = await User.findById(req.cookies.user_id);
          if (!user) {
            res.send(oauth2FailedResponse);
            return;
          }

          console.log(user);
          const existingServiceIndex = user?.services.findIndex(service => service.key === 'twitter');
          console.log(existingServiceIndex);
          if (existingServiceIndex >= 0) {
            console.log("Updating existing Twitter service");
            user.services[existingServiceIndex].connected = true;
            user.services[existingServiceIndex].token = accessToken;
            user.services[existingServiceIndex].refreshToken = refreshToken as string;

            await user.save();

            res.send(oauth2SuccessResponse);
          } else {
            res.send(oauth2FailedResponse);
          }
        })
        .catch(() => {
          console.log("Failed to login with OAuth2");
          res.status(500).json({
            status: 'error',
            message: 'Failed to login with OAuth2',
          });
          return;
        })
  
    } catch (err: any) {
      res.send(oauth2FailedResponse);
    }
  });

export default router;
