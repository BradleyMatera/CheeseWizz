// controllers/getContactsController.js
const Contact = require('../models/contactModel');

const getContacts = async (req, res) => {
  const { page = 1, limit = 10, sort = 'lname', direction = 'asc', search = '' } = req.query;

  // Build query for search term
  const query = search 
    ? { $or: [{ fname: new RegExp(search, 'i') }, { lname: new RegExp(search, 'i') }] } 
    : {};

  const options = {
    page: parseInt(page),  // Page number
    limit: parseInt(limit),  // Number of contacts per page
    sort: { [sort]: direction === 'asc' ? 1 : -1 },  // Sort by field
  };

  try {
    // Paginate with query, returning contacts
    const contacts = await Contact.paginate(query, options);

    // Ensure correct schema fields in the response
    const formattedContacts = contacts.docs.map((contact) => ({
      id: contact.id,  // Ensures that id field is used instead of _id
      fname: contact.fname,
      lname: contact.lname,
      email: contact.email,
      phone: contact.phone,
      birthday: contact.birthday
    }));

    res.status(200).json({
      contacts: formattedContacts,  // Paginated contacts with correct schema
      totalPages: contacts.totalPages,  // Total number of pages
      currentPage: contacts.page,  // Current page
      totalContacts: contacts.totalDocs  // Total number of contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};

module.exports = getContacts;