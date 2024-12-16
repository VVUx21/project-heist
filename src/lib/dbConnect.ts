import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  if (mongoose.connections.length > 0) {
    const existingConnection = mongoose.connections[0].readyState;
    if (existingConnection === 1) {
      console.log('Using existing database connection');
      connection.isConnected = 1;
      return;
    }

    // Close previous connections if not in ready state
    await mongoose.disconnect();
  }

  if (!process.env.MONGO_URI) {
    console.error('Missing MONGO_URI in environment variables');
    throw new Error('Database connection failed due to missing URI');
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    connection.isConnected = db.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log('Database connected successfully');
    } else {
      console.error('Database connection failed: Invalid connection state');
    }
  } catch (error:any) {
    console.error('Error connecting to the database:', error.message);
    throw new Error('Database connection failed');
  }
}

export default dbConnect;
