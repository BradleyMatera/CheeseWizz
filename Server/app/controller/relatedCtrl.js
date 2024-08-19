const mongoose = require('mongoose'); // Importing Mongoose, a MongoDB object modeling tool.
const Cheese = require('../models/cheeseModel'); // Importing the Cheese model to interact with the cheese collection in the database.

// Function to get all related cheeses.
const getAllRelatedCheeses = async (req, res) => {
    try {
        const cheeses = await Cheese.find({}); // Retrieve all cheese entries.
        const relatedCheeses = cheeses.map(cheese => cheese.relatedCheese); // Map through related cheeses.
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

// Function to get a specific related cheese by its ID.
const getRelatedCheeseById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { // Validate if the provided ID is a valid MongoDB ObjectID.
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const cheese = await Cheese.findById(req.params.id); // Retrieve cheese by ID.
        if (!cheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found'
            });
        }

        res.status(200).json({
            success: true,
            data: cheese.relatedCheese,
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