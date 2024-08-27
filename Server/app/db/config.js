const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not defined");
    }

    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB is now connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1); // Exit the process if not in a test environment
        } else {
            throw new Error('Failed to connect to MongoDB');
        }
    }
};

module.exports = connectDB;