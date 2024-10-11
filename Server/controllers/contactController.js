const { validateContactData } = require('@jworkman-fs/asl/src/Model/index.js');
const { InvalidContactSchemaError } = require('@jworkman-fs/asl/src/Exception/index.js');
const ContactModel = require('../models/contactModel');
const mongoose = require('mongoose');

/**
 * Helper function to format contacts for consistent API response.
 * @param {Object} contact - A contact document from MongoDB.
 * @returns {Object} - A formatted contact object including the required fields.
 */
const formatContact = (contact) => ({
  id: contact._id.toString(),
  fname: contact.fname,
  lname: contact.lname,
  email: contact.email,
  phone: contact.phone,
  birthday: contact.birthday,
});

/**
 * Validate if the provided ID is a valid MongoDB ObjectId.
 * @param {string} id - The ID to validate.
 * @returns {boolean} - True if valid ObjectId, otherwise false.
 */
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * Helper function to handle filtering, sorting, and pagination for contacts.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Object} [filter={}] - Optional filter for the MongoDB query.
 */
const getPaginatedResults = async (req, res, filter = {}) => {
  try {
    // Apply filtering
    const filterBy = req.query.filterBy || '';
    const filterValue = req.query.filterValue || '';
    if (filterBy && filterValue) {
      filter[filterBy] = filterValue; // Add filter conditions if provided
    }

    // Apply sorting
    const sortBy = req.query.sort || 'lname'; // Sort by last name by default
    const direction = req.query.direction === 'desc' ? -1 : 1; // Sorting direction

    // Fetch the filtered and sorted contacts
    let contacts = await ContactModel.find(filter).sort({ [sortBy]: direction });

    // Apply pagination to the sorted and filtered results
    const page = parseInt(req.query.page) || 1; // Current page
    const limit = parseInt(req.query.limit) || 10; // Items per page
    const skip = (page - 1) * limit; // Skip items for pagination

    const paginatedContacts = contacts.slice(skip, skip + limit);

    const totalContacts = contacts.length; // Total number of filtered contacts

    // Handle case where no contacts are found
    if (paginatedContacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found.' });
    }

    const formattedContacts = paginatedContacts.map(formatContact);

    // Set pagination headers
    res.set('X-Page-Total', totalContacts);
    res.set('X-Page-Next', page < Math.ceil(totalContacts / limit) ? page + 1 : null);
    res.set('X-Page-Prev', page > 1 ? page - 1 : null);
    res.json(formattedContacts);
  } catch (error) {
    console.error(`Error fetching paginated results: ${error.message}`);
    res.status(500).json({ error: 'An error occurred while retrieving contacts.' });
  }
};

/**
 * Controller to get all contacts with pagination, filtering, and sorting.
 * @route GET /v1/contacts
 */
exports.getContacts = async (req, res) => {
  await getPaginatedResults(req, res);
};

/**
 * Controller to get a specific contact by ID.
 * @route GET /v1/contacts/:id
 */
exports.getContactById = async (req, res) => {
  try {
    // Validate if the provided ID is a valid ObjectId
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format.' });
    }

    const contact = await ContactModel.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    const formattedContact = formatContact(contact);
    res.json(formattedContact);
  } catch (error) {
    console.error(`Error fetching contact by ID: ${error.message}`);
    res.status(500).json({ error: 'An error occurred while retrieving the contact.' });
  }
};

/**
 * Controller to create a new contact.
 * @route POST /v1/contacts
 */
exports.createContact = async (req, res) => {
  try {
    validateContactData(req.body); // Validate the incoming contact data
    const newContact = new ContactModel(req.body);
    await newContact.save();
    res.status(303).location(`/v1/contacts/${newContact._id}`).json(formatContact(newContact));
  } catch (error) {
    if (error instanceof InvalidContactSchemaError) {
      console.error(`Invalid contact data: ${error.message}`);
      res.status(400).json({ error: error.message });
    } else {
      console.error(`Error creating contact: ${error.message}`);
      res.status(500).json({ error: 'An error occurred while creating the contact.' });
    }
  }
};

/**
 * Controller to update a contact by ID.
 * @route PUT /v1/contacts/:id
 */
exports.updateContact = async (req, res) => {
  try {
    // Validate if the provided ID is a valid ObjectId
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format.' });
    }

    validateContactData(req.body); // Validate the incoming contact data
    const updatedContact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(formatContact(updatedContact));
  } catch (error) {
    console.error(`Error updating contact: ${error.message}`);
    res.status(500).json({ error: 'An error occurred while updating the contact.' });
  }
};

/**
 * Controller to delete a contact by ID.
 * @route DELETE /v1/contacts/:id
 */
exports.deleteContact = async (req, res) => {
  try {
    // Validate if the provided ID is a valid ObjectId
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format.' });
    }

    const contact = await ContactModel.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).end(); // No content after deletion
  } catch (error) {
    console.error(`Error deleting contact: ${error.message}`);
    res.status(500).json({ error: 'An error occurred while deleting the contact.' });
  }
};