import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log('Using existing database connection');
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Missing MONGO_URI in environment variables');
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10, 
      minPoolSize: 1,  
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000, 
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('Database connected successfully with connection pooling');
  } catch (error:any) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
}

export default dbConnect;
