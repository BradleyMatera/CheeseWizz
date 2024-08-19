const mongoose = require('mongoose'); // Importing Mongoose.
const Cheese = require('../models/cheeseModel'); // Importing the Cheese model.

const getAllCheeseTastes = async (req, res) => { // Function to get all cheese tastes.
    try {
        const cheeses = await Cheese.find({}); 
        const tastes = cheeses.map(cheese => cheese.taste);
        res.status(200).json({
            data: tastes,
            success: true,
            message: `${req.method} - Request made to taste endpoint`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

const getCheeseTasteById = async (req, res) => { // Function to get a specific cheese taste by its ID.
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
            data: cheese.taste,
            success: true,
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