import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';
import User, { IUser } from '../models/user';
import authMiddleware from '../middleware/auth';
// import { totp } from 'speakeasy';

const router = express.Router();

interface JwtPayload {
  id: string;
  role: string;
}

const generateTokens = (user: IUser) => {
  const access_token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  const refresh_token = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
  return { access_token, refresh_token };
};

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

// GET /api/v1/users/:id - Get user information
router.get('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
    } else {
      res.status(200).json({
        status: 'success',
        user,
      });
    }
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/user/:id - Update user information (email, TOTP, etc.)
router.patch('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
    } else {
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
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/v1/user/:id/totp - Disable TOTP
router.delete('/:id/totp', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
    } else if (!user.totp_enabled) {
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

export default router;
