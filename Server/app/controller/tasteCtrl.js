const mongoose = require('mongoose');
const Taste = require('../models/tasteSchema'); // Import the Taste model

// Function to get all cheese tastes
const getAllCheeseTastes = async (req, res) => {
    try {
        const tastes = await Taste.find({}); // Find all tastes in the database
        res.status(200).json({
            success: true,
            data: tastes,
            message: `${req.method} - Request made to taste endpoint`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Function to get a specific cheese taste by its ID
const getCheeseTasteById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { // Validate if the ID is a valid MongoDB ObjectID
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const taste = await Taste.findById(req.params.id); // Find taste by ID
        if (!taste) {
            return res.status(404).json({
                success: false,
                message: 'Taste not found'
            });
        }

        res.status(200).json({
            success: true,
            data: taste,
            message: `${req.method} - Request made to taste endpoint with id ${req.params.id}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = {
    getAllCheeseTastes,
    getCheeseTasteById
};