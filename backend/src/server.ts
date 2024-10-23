import app, { connectDB } from './app';
import dotenv from 'dotenv';
import ServiceInfo from './models/servicesList';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

const startServer = async () => {
  try {
    await connectDB();
    await ServiceInfo.seed();
    await ServiceInfo.updateAllUsersServices();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error('Failed to start server:', error);
  }
};

startServer();
