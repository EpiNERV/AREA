import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

const addUserIdToBody = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        req.body.params_userID = id;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid user ID format' });
        next(err);
    }
};

export default addUserIdToBody;