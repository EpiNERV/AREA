import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helloRoutes from './routes/hello';

dotenv.config();

const app: Application = express();
app.disable("x-powered-by");

app.use(express.json());

export const connectDB = async () => {
  if (process.env.NODE_ENV === 'test')
    process.env.MONGO_URL = process.env.MONGO_TEST_URL;
  try {
    await mongoose.connect(process.env.MONGO_URL ?? '');
    console.log('MongoDB connected ' + process.env.MONGO_URL);
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message ?? 'Unknown error');
    process.exit(1);
  }
};

app.use('/api/v1', helloRoutes);

export default app;
