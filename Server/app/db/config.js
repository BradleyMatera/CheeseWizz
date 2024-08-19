const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB is now connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;