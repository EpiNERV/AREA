import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../middleware/auth';
import Workflow from '../models/workflow';
import User from '../models/user';
import adminMiddleware from '../middleware/admin';
import addUserIdToBody from '../middleware/addUserIdToBody';
import Accessibility from '../models/accessibility';

const router = express.Router();

// GET /api/v1/admin/users/ - Returns all users
router.get('/users/', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {

    try {
        const users = await User.find();
        if (!users) {
            res.status(404).json({ message: 'Users not found' });
            return;
        }
        const usersJson = users.map(user => ({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            nbr_workflow: user.workflows.length,
            last_connection: user.last_connection,
        }));

        res.status(200).json({
            status: 'success',
            user: usersJson,
            user_count: users.length,
        });
        console.log("List Sent")
    } catch (err) {
        next(err);
    }
});

// PATCH /api/v1/admin/user/:id/update/ - Updates user info
router.patch('/user/:id/update', authMiddleware, adminMiddleware, addUserIdToBody, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.params_userID;
        const { email, username, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { email, username, role }, { new: true });

        if (!updatedUser) {
            res.status(404).json({ message: 'User not updated' });
            return;
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
});

// DELETE /api/v1/admin/user/:id/delete/ - Delete user
router.delete('/user/:id/delete', authMiddleware, adminMiddleware, addUserIdToBody, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.params_userID;
        const { user } = req.body;
        if (id === user.id) {
            res.status(404).json({ message: 'Cannot delete self' });
            return;
        }
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).json({ message: 'User not deleted' });
            return;
        }
        const deletedAccessibility = await Accessibility.findByIdAndDelete(deletedUser.accessibility);
        if (!deletedAccessibility) {
            res.status(404).json({ message: 'Accessibility setting not deleted' });
            return;
        }
        console.log(deletedUser);
        res.status(200).json(deletedUser);
    } catch (err) {
        next(err);
    }
});

// POST /api/v1/admin/user/ - Creates new user
router.post('/user', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username, role, password} = req.body;
        const newUser = new User({email, username, role, password});
        await newUser.save();
        if (!newUser) {
            res.status(404).json({ message: 'User not deleted' });
            return;
        }
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
});

export default router;