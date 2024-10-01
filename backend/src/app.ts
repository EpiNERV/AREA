import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helloRoutes from './routes/hello';

dotenv.config();

const app: Application = express();
app.disable("x-powered-by");

app.use(express.json());

export const connectDB = async (mongoUri?: string) => {
  try {
    const mongoConnectionUri =
      process.env.NODE_ENV === 'test' && mongoUri
        ? mongoUri
        : process.env.MONGO_URL ?? '';

    await mongoose.connect(mongoConnectionUri);
    console.log('MongoDB connected');
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message ?? 'Unknown error');
    process.exit(1);
  }
};

app.use('/api/v1', helloRoutes);

export default app;
