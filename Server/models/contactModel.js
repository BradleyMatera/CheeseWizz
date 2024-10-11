const mongoose = require("mongoose");

// Define the schema for a contact
const contactSchema = new mongoose.Schema({
  // First name: required, must be a string, and trimmed to remove leading/trailing spaces
  fname: { 
    type: String, 
    required: [true, 'First name is required.'], 
    trim: true 
  },
  
  // Last name: required, must be a string, and trimmed to remove leading/trailing spaces
  lname: { 
    type: String, 
    required: [true, 'Last name is required.'], 
    trim: true 
  },
  
  // Email: required, must be unique, and stored in lowercase to ensure consistency
  email: { 
    type: String, 
    required: [true, 'Email is required.'], 
    unique: true, 
    trim: true, 
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address.'] // Validation to ensure a proper email format
  },
  
  // Phone number: required and trimmed for consistency
  phone: { 
    type: String, 
    required: [true, 'Phone number is required.'], 
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.'] // Validation for a 10-digit phone number
  },
  
  // Birthday: required and must be a valid date
  birthday: { 
    type: Date, 
    required: [true, 'Birthday is required.'] 
  }

}, { 
  // Include virtual fields (like 'id') when converting to JSON or an object
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true } 
});

// Create a virtual property 'id' that returns the string representation of the _id field
// This allows the virtual 'id' to be used in place of '_id' when returning the object
contactSchema.virtual('id').get(function () {
  return this._id.toHexString(); // Convert the _id (ObjectID) to a string
});

// Before saving a document, add any custom validation or formatting logic here (if needed)
contactSchema.pre('save', function (next) {
  // Example: Ensure first and last names are capitalized
  this.fname = this.fname.charAt(0).toUpperCase() + this.fname.slice(1).toLowerCase();
  this.lname = this.lname.charAt(0).toUpperCase() + this.lname.slice(1).toLowerCase();

  next(); // Continue to save the document
});

// Error handling for uniqueness constraint violations (like duplicate emails)
contactSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('A contact with this email already exists.'));
  } else {
    next(error); // Pass other errors to the next handler
  }
});

// Compile the schema into a model (which creates a collection in MongoDB)
const ContactModel = mongoose.model('Contact', contactSchema);

// Export the model to be used in other parts of the application
module.exports = ContactModel;