import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
app.disable("x-powered-by");

app.use(express.json());

app.use('/api/v1/hello', (_, res) => {
    res.send('Hello World!');
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? '');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

export default app;
