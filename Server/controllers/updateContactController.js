const Contact = require('../models/contactModel');

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, email, phone, birthday } = req.body;

  try {
    console.log('Updating contact:', { fname, lname, email, phone, birthday });

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { fname, lname, email, phone, birthday },
      { new: true, runValidators: true } // Runs validators and returns updated contact
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error.message);
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
};

module.exports = updateContact;