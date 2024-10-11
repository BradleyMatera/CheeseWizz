const mongoose = require('mongoose');

/**
 * Asynchronously connects to MongoDB using Mongoose.
 * The connection URI is expected to be provided in the environment variable `MONGODB_URI`.
 * 
 * @throws {Error} If the `MONGODB_URI` is not defined in the environment variables.
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  // Check if MONGODB_URI is defined
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in the environment variables.');
  }

  try {
    // Attempt to connect to MongoDB using the provided URI
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Log successful connection details
    console.log(`✅ MongoDB connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    // Log the error details and exit the process with failure code
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);

    // Optionally log the stack trace in development mode for better debugging
    if (process.env.NODE_ENV !== 'production') {
      console.error(error.stack);
    }

    // Exit the process with status code 1 (failure)
    process.exit(1);
  }
};

/**
 * Handles the process exit gracefully.
 * Ensures the MongoDB connection is closed when the application shuts down.
 */
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to application termination.');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error while closing MongoDB connection: ${error.message}`);
    process.exit(1);
  }
});

module.exports = connectDB;