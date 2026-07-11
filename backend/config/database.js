import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Configure dotenv just in case this module is executed independently (e.g. in seeding scripts)
dotenv.config();

// Configure Node's internal c-ares DNS resolver to use Google DNS.
// This prevents querySrv ECONNREFUSED errors commonly caused by local router DNS servers on Windows.
dns.setServers(['8.8.8.8', '8.8.4.4']);

/**
 * Establishes a connection to the MongoDB Atlas database.
 * Sets the requested Mongoose configuration options and logs success/failure.
 * Exits the application process with code 1 if the connection fails.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves when connection is successful.
 */
export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Connect to MongoDB Atlas using the configured connection URI
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Exit process with failure code
    process.exit(1);
  }
};

export default connectDB;
