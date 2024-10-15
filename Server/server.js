// server.js
const express = require('express');
const mongoose = require('mongoose');
const contactsRouter = require('./routes/contactsRouter');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Create the Express app
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/v1/contacts', contactsRouter);
app.get('/', (req, res) => {
  res.send('Welcome to the Contact Book API');
});

// Error handling for 404
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// MongoDB connection and server startup
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set('strictQuery', false); // Prepare for Mongoose 7
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });