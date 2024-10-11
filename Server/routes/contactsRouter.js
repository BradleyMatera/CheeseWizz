const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Middleware for logging request details (optional)
router.use((req, res, next) => {
  console.log(`${req.method} request received for ${req.url}`);
  next();
});

/**
 * Route to get all contacts.
 * Supports pagination, sorting, and filtering via query parameters.
 * Query Parameters:
 * - `page` (optional): The page number for pagination (default is 1).
 * - `limit` (optional): The number of results per page (default is 10).
 * - `sort` (optional): Field to sort by (default is 'lname').
 * - `direction` (optional): Sort direction ('asc' or 'desc').
 * - `filterBy` (optional): Field to filter by (e.g., 'fname').
 * - `filterValue` (optional): The value to filter on (e.g., 'John').
 */
router.get('/contacts', async (req, res, next) => {
  try {
    await contactController.getContacts(req, res);
  } catch (error) {
    next(error); // Pass any errors to the global error handler
  }
});

/**
 * Route to get a specific contact by ID.
 * Path Parameters:
 * - `id`: The ID of the contact to retrieve.
 */
router.get('/contacts/:id', async (req, res, next) => {
  try {
    await contactController.getContactById(req, res);
  } catch (error) {
    next(error); // Handle any errors
  }
});

/**
 * Route to create a new contact.
 * Body Parameters (JSON):
 * - `fname`: First name (required).
 * - `lname`: Last name (required).
 * - `email`: Email (required, must be unique).
 * - `phone`: Phone number (required).
 * - `birthday`: Birthday (required).
 */
router.post('/contacts', async (req, res, next) => {
  try {
    await contactController.createContact(req, res);
  } catch (error) {
    next(error); // Handle validation or other errors
  }
});

/**
 * Route to update a specific contact by ID.
 * Path Parameters:
 * - `id`: The ID of the contact to update.
 * Body Parameters (JSON): Same as POST /contacts.
 */
router.put('/contacts/:id', async (req, res, next) => {
  try {
    await contactController.updateContact(req, res);
  } catch (error) {
    next(error); // Pass any errors to error handling middleware
  }
});

/**
 * Route to delete a specific contact by ID.
 * Path Parameters:
 * - `id`: The ID of the contact to delete.
 */
router.delete('/contacts/:id', async (req, res, next) => {
  try {
    await contactController.deleteContact(req, res);
  } catch (error) {
    next(error); // Pass any errors to error handling middleware
  }
});

/**
 * Global error handler for handling errors in routes.
 * This middleware should be defined at the end of all route definitions.
 */
router.use((err, req, res, next) => {
  console.error(`Error occurred: ${err.message}`);
  res.status(500).json({ error: err.message || 'An unknown error occurred.' });
});

module.exports = router;