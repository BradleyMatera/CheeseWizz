// models/contactSchema.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    minlength: 2,
  },
  lname: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  birthday: {
    type: Date,
    required: true,
  }
}, { 
  timestamps: true
});

// Ensure that _id is transformed to id in the returned JSON
contactSchema.set('toJSON', {
  virtuals: true, // Include virtual fields
  versionKey: false, // Remove __v
  transform: (doc, ret) => {
    ret.id = ret._id; // Map _id to id
    delete ret._id; // Remove _id from the response
  }
});

module.exports = mongoose.model('Contact', contactSchema);