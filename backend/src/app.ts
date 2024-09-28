import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
app.disable("x-powered-by");

app.use(express.json());

app.use('/api/v1/hello', (_, res) => {
    res.send({ message: 'Hello World!' });
});

export const connectDB = async (mongoUri?: string) => {
  try {
    const mongoConnectionUri =
      process.env.NODE_ENV === 'test' && mongoUri
        ? mongoUri
        : process.env.MONGO_URI ?? '';

    await mongoose.connect(mongoConnectionUri);
    console.log('MongoDB connected to ${mongoConnectionUri}');
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message ?? 'Unknown error');
    process.exit(1);
  }
};

export default app;
