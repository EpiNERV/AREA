import app, { connectDB } from './app';
import dotenv from 'dotenv';
import ServiceInfo from './models/serviceInfo';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

const startServer = async () => {
  try {
    await connectDB();
    await ServiceInfo.seed();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error('Failed to start server:', error);
  }
};

startServer();
