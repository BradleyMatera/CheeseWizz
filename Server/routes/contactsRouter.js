const express = require('express');
const router = express.Router();

const getContacts = require('../controllers/getContactsController');
const getContactById = require('../controllers/getContactByIdController');
const createContact = require('../controllers/createContactController');
const updateContact = require('../controllers/updateContactController');
const deleteContact = require('../controllers/deleteContactController');

// Routes
router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;