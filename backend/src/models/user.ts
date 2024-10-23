import { Document, model, Schema } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import jsonServicesList from "./default_services_list.json";
import Service from './service';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  totp_secret?: string;
  totp_enabled: boolean;
  role: 'user' | 'admin';
  services: Schema.Types.ObjectId;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
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
    services: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving
UserSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (!user.isModified('password')) return next();

  const salt = await genSalt(10);
  user.password = await hash(user.password, salt);
  next();
});

// Pre-save middleware to add default services if the user is new
UserSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (!user.isNew) return next();

  // Query the services from the JSON
  const services = jsonServicesList.map(service => ({
    name: service.displayedName ,
    key: service.key,
    connected: false,
  }));

  // Create a Service document and save it
  const service = new Service({
    user: user._id,
    services,
  });
  await service.save();

  // Link it to the user
  user.services = service._id as Schema.Types.ObjectId;

  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return compare(candidatePassword, this.password);
};

// Export the User model
const User = model<IUser>('User', UserSchema);
export default User;
