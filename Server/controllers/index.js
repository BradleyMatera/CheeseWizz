// controllers/index.js
const createContactController = require('./createContactController');
const deleteContactController = require('./deleteContactController');
const getContactByIdController = require('./getContactByIdController');
const getContactsController = require('./getContactsController');
const updateContactController = require('./updateContactController');

module.exports = {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  updateContactController,
};