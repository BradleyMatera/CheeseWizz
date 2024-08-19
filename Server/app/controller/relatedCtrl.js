const mongoose = require('mongoose');
const RelatedCheese = require('../models/relatedCheeseSchema'); // Import the RelatedCheese model

// Function to get all related cheeses
const getAllRelatedCheeses = async (req, res) => {
    try {
        const relatedCheeses = await RelatedCheese.find({}); // Find all related cheese entries
        res.status(200).json({
            success: true,
            data: relatedCheeses,
            message: `${req.method} - Request made to relatedCheese endpoint`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Function to get a specific related cheese by its ID
const getRelatedCheeseById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { // Validate if the ID is a valid MongoDB ObjectID
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const relatedCheese = await RelatedCheese.findById(req.params.id); // Find related cheese by ID
        if (!relatedCheese) {
            return res.status(404).json({
                success: false,
                message: 'Related cheese not found'
            });
        }

        res.status(200).json({
            success: true,
            data: relatedCheese,
            message: `${req.method} - Request made to relatedCheese endpoint with id ${req.params.id}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = {
    getAllRelatedCheeses,
    getRelatedCheeseById
};