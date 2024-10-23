import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../middleware/auth';
import Workflow from '../models/workflow';
import User from '../models/user';

const router = express.Router();

// GET /api/v1/workflows - Get all workflows
router.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    const workflowList = await User.findById(user._id).select('workflows').exec();
    if (!workflowList) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const workflows = await Workflow.find({ _id: { $in: workflowList.workflows } });
    res.status(200).json(workflows);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/workflows - Create a new workflow
router.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, user } = req.body;
    if (!name) {
      res.status(400).json({ message: 'Workflow name is required' });
      return;
    }
    const newWorkflow = new Workflow({ name });
    await newWorkflow.save();
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    user.workflows.push(newWorkflow._id);
    await user.save();
    res.status(201).json(newWorkflow);
  } catch (err) {
    next(err);
  }
});

// PUT /api/v1/workflows/:id - Update a workflow
router.put('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    try {
      const updatedWorkflow = await Workflow.findByIdAndUpdate(id, { name }, { new: true });

      if (!updatedWorkflow) {
        res.status(404).json({ message: 'Workflow not found' });
        return;
      }
      res.status(200).json(updatedWorkflow);
    } catch (err) {
      res.status(400).json({ message: 'Invalid workflow ID' });
      return;
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/v1/workflows/:id - Delete a workflow
router.delete('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    const { id } = req.params;

    try {
      const deletedWorkflow = await Workflow.findByIdAndDelete(id);

      if (!deletedWorkflow) {
        res.status(404).json({ message: 'Workflow not found' });
        return;
      }

      await User.updateOne(
        { _id: user._id },
        { $pull: { workflows: deletedWorkflow._id } }
      );

      res.status(204).send();
    } catch (err) {
      res.status(400).json({ message: 'Invalid workflow ID' });
      return;
    }
  } catch (err) {
    next(err);
  }
});

export default router;
