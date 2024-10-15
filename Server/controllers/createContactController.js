const Contact = require('../models/contactModel');

const createContact = async (req, res) => {
  try {
    const { fname, lname, email, phone, birthday } = req.body;

    // Check for missing fields
    if (!fname || !lname || !email || !phone || !birthday) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save the new contact
    const newContact = new Contact({
      fname,
      lname,
      email,
      phone,
      birthday: new Date(birthday)
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `Duplicate key error: ${field} already exists.` });
    }
    res.status(500).json({ message: "Error creating contact", error });
  }
};

module.exports = createContact;