import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user';

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { user } = req.body
    const role = user.role
    console.log("Current user's role is: ", role)
    if (role === 'user') {
        res.status(403).json({status: 'error', message: 'Forbidden'})
        return;
    }
    next();
};

export default adminMiddleware;
