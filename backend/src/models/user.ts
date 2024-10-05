import mongoose, { Document, Schema } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

// Interface that extends the mongoose Document
export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  totp_secret?: string;
  totp_enabled: boolean;
  role: 'user' | 'admin';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User Schema
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    totp_secret: {
      type: String,
      default: null,
    },
    totp_enabled: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (!user.isModified('password')) return next();

  const salt = await genSalt(10);
  user.password = await hash(user.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return compare(candidatePassword, this.password);
};

// Export the User model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
