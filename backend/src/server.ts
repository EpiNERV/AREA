import app, { connectDB } from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error('Failed to start server:', error);
  }
};

startServer();
