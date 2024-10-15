require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('../models/contactModel');
const seedData = require('./seedData.json');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return Contact.deleteMany({});
  })
  .then(() => {
    console.log('Existing contacts cleared.');
    return Contact.insertMany(seedData);
  })
  .then(() => {
    console.log('Contacts seeded successfully!');
    process.exit();
  })
  .catch((error) => {
    console.error('Error seeding the database:', error.message);
    process.exit(1);
  });