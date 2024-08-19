const express = require('express');
const router = express.Router();
const cheeseRoutes = require('./cheeseRoutes'); // Single file for all routes

router.use('/', cheeseRoutes); // All routes handled by cheeseRoutes

module.exports = router;