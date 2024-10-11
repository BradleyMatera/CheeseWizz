const express = require('express');
const cors = require('cors'); // Enable CORS for Swagger compatibility
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactsRouter'); // Ensure this path is correct
const app = express();

// Enable CORS for all routes, allowing Swagger to make requests without issues
app.use(cors({
  origin: '*', // Allow requests from all origins (you can restrict this if needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Only allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Filter-By', 'X-Filter-Operator', 'X-Filter-Value'] // Allow necessary headers
}));

// Middleware for parsing JSON requests
app.use(express.json());

// Use the contact routes under the /v1 prefix
app.use('/v1', contactRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contactbook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully at 127.0.0.1:27017');
}).catch((error) => {
  console.error('MongoDB connection error:', error.message);
  process.exit(1); // Exit if MongoDB connection fails
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Global error handler for unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error.message);
  process.exit(1); // Exit process after logging the error
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  process.exit(1); // Exit process after logging the error
});