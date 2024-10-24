import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helloRoutes from './routes/hello';
import adminRoutes from './routes/admin';
import userRoutes from './routes/user';
import discordRoutes from './routes/services/discord';
import twitterRoutes from './routes/services/twitter';
import workflow from './routes/workflow';
import errorHandler from './middleware/error';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Application = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

const allowedOrigins = process.env.SERVER_URLS?.split(',') || ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      // Allow requests with no origin (like mobile apps or curl requests)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Enable credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));  // Apply the CORS middleware to all routes

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
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/user', discordRoutes);
app.use('/api/v1/user', twitterRoutes);
app.use('/api/v1/workflow', workflow);
app.use(errorHandler);

export default app;
