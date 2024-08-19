const mongoose = require('mongoose');
const Origin = require('../models/originSchema'); 

const getAllCheeseOrigins = async (req, res) => {
    try {
        const origins = await Origin.find({});
        res.status(200).json({
            success: true,
            data: origins,
            message: `${req.method} - Request made to origin endpoint`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

const getCheeseOriginById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const origin = await Origin.findById(req.params.id);
        if (!origin) {
            return res.status(404).json({
                success: false,
                message: 'Origin not found'
            });
        }

        res.status(200).json({
            success: true,
            data: origin,
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