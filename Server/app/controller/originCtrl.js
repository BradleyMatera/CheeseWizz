const mongoose = require('mongoose'); // Importing Mongoose.
const Cheese = require('../models/cheeseModel'); // Importing the Cheese model.

const getAllCheeseOrigins = async (req, res) => { // Function to get all cheese origins.
    try {
        const cheeses = await Cheese.find({}); 
        const origins = cheeses.map(cheese => cheese.origin);
        res.status(200).json({
            data: origins,
            success: true,
            message: `${req.method} - Request made to origin endpoint`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

const getCheeseOriginById = async (req, res) => { // Function to get a specific cheese origin by its ID.
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const cheese = await Cheese.findById(req.params.id); 
        if (!cheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found'
            });
        }

        res.status(200).json({
            data: cheese.origin,
            success: true,
            message: `${req.method} - Request made to origin endpoint with id ${req.params.id}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = {
    getAllCheeseOrigins,
    getCheeseOriginById
};