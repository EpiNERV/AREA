import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';
import User, { IUser } from '../models/user';
import authMiddleware from '../middleware/auth';
import Accessibility from '../models/accessibility';
import Service from '../models/service';
import ServicesList from '../models/servicesList';

const router = express.Router();

const generateTokens = (user: IUser) => {
  const access_token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: '1h' });
  const refresh_token = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET as jwt.Secret, { expiresIn: '7d' });
  return { access_token, refresh_token };
};

/*
  User Auth routes
*/

// POST /api/v1/user/auth/register
router.post('/auth/register', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({ status: 'error', message: 'Email, password, and username are required' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ status: 'error', message: 'Password must be at least 6 characters' });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ status: 'error', message: 'Email is already in use' });
    } else {
      const newUser = new User({ email, password, username });

      const newAccessibility = new Accessibility();
      newAccessibility.save();
      newUser.accessibility = newAccessibility.id;

      await newUser.save();

      const tokens = generateTokens(newUser);

      res.status(201).json({
        status: 'success',
        message: 'Registration successful',
        user: { id: newUser._id, email: newUser.email, username: newUser.username, role: newUser.role },
        tokens,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// POST /api/v1/user/auth/login
router.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ status: 'error', message: 'Email and password are required' });
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ status: 'error', message: 'Invalid email or password' });
    } else {
      const tokens = generateTokens(user);

      user.last_connection = new Date();
      user.save();

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        user: { id: user._id, email: user.email, username: user.username, role: user.role },
        tokens,
      });
    }
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/user/auth/refresh_token
router.post('/auth/refresh_token', async (req: Request, res: Response) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    res.status(400).json({ message: 'Refresh token is required' });
    return;
  }

  try {
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET as jwt.Secret) as { id: string };

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const tokens = generateTokens(user);

    res.json(tokens);
    return;

  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
    return;
  }
});

// GET /api/v1/user/ - Get user information
router.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.user;
    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/user/ - Update user information (email, TOTP, etc.)
router.patch('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const { user, email, username, password } = req.body;
  try {
    if (email) user.email = email;
    if (username != undefined) {
      if (username == "") {
        res.status(400).json({ status: 'error', message: 'Username cannot be empty' });
        return;
      }
      user.username = username;
    }
    if (password != undefined) {
      if (password.length < 6) {
        res.status(400).json({ status: 'error', message: 'Password must be at least 6 characters' });
        return;
      }
      user.password = await hash(password, 10);
    }
    await user.save();

    res.status(200).json({
      status: 'success',
      user: { id: user._id, email: user.email, username: user.username, totp_enabled: user.totp_enabled },
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/v1/user/:id/totp - Disable TOTP
router.delete('/totp', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.user;
    if (!user.totp_enabled) {
      res.status(400).json({ status: 'error', message: 'TOTP is already disabled' });
    } else {
      user.totp_enabled = false;
      user.totp_secret = undefined;
      await user.save();

      res.status(200).json({
        status: 'success',
        user: { id: user._id, email: user.email, username: user.username, totp_enabled: user.totp_enabled },
      });
    }
  } catch (err) {
    next(err);
  }
});

/*
  User Service routes
*/

// GET /api/v1/user/services - Fetch all services with connection status for the authenticated user
router.get('/services', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.body.user._id);
    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }

    const user_services_doc = await Service.findOne({ user: user._id });
    if (!user_services_doc) {
      res.status(404).json({ status: 'error', message: 'Services not found in User' });
      return;
    }
    res.status(200).json(user_services_doc.services);

  } catch (err) {
    next(err);
  }
});

// POST /api/v1/user/services/connect/:key - Returns the route to start an OAuth flow
router.get('/services/connect/:key', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.body.user._id);
    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }

    const user_services_doc = await Service.findOne({ user: user._id });
    if (!user_services_doc) {
      res.status(404).json({ status: 'error', message: 'Services not found in User' });
      return;
    }
    const { key } = req.params;
    const target_service = user_services_doc.services.find((service) => service.key === key);
    if (!target_service) {
      res.status(404).json({ status: 'error', message: 'Service not found' });
      return;
    }
    // Get service info from servicesList collection
    const service_info = await ServicesList.findOne({ name: target_service.key });
    if (!service_info) {
      res.status(404).json({ status: 'error', message: 'Service not found in ServicesList' });
      return;
    }

    res.status(200).json({ status: 'success', url: service_info.oauth2_redirect_uri, user_id: user._id });

  } catch (err) {
    next(err);
  }
});


// POST /api/v1/user/services/disconnect/:serviceKey - Disconnect a user from a service
router.post('/services/disconnect/:serviceKey', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ status: 'error', message: 'Not implemented' });
  return;

  // const { serviceKey } = req.params;
  // console.log(serviceKey);

  // try {
  //   const user = await User.findById(req.body.user._id);

  //   if (!user) {
  //     res.status(404).json({ status: 'error', message: 'User not found' });
  //     return;
  //   }

  //   const service = user.services.find((service) => service.key === serviceKey);

  //   if (!service) {
  //     res.status(404).json({ status: 'error', message: 'Service not found' });
  //     return;
  //   }

  //   // Update service connection status
  //   service.token = null;
  //   service.connected = false;

  //   await user.save();

  //   res.status(200).json({
  //     status: 'success',
  //     message: `Disconnected from ${service.name}`,
  //     service,
  //   });
  // } catch (err) {
  //   next(err);
  // }
});

// PATCH /api/v1/user/accessibility - Update user accessibility options
router.patch('/accessibility', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const { color_blindness, color, mode, language } = req.body;
  try {
    const user = await User.findById(req.body.user._id);
    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }

    const updatedAccessibility = await Accessibility.findByIdAndUpdate(user.accessibility, { color_blindness, color, mode, language }, { new: true });

    res.status(200).json(updatedAccessibility)
  } catch (err) {
    next(err);
  }
});

export default router;
