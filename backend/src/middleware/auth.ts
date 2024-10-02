import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';

interface JwtPayload {
  id: string;
  role: string;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ status: 'error', message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user: IUser | null = await User.findById(decoded.id);
    
    if (!user) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
      return;
    }

    req.user = user;  // Attach the user to the request object
    next();
  } catch (err) {
    res.status(401).json({ status: 'error', message: 'Unauthorized' });
    return;
  }
};

export default authMiddleware;
