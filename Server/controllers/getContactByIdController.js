const mongoose = require('mongoose');
const Contact = require('../models/contactModel');

const getContactById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact by ID:', error.message);
    res.status(500).json({ message: 'Error fetching contact', error });
  }
};

module.exports = getContactById;