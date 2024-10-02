import { IUser } from '../models/user'; // Adjust the path to your user model

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
