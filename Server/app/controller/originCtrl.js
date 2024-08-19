const mongoose = require('mongoose');
const Origin = require('../models/originSchema');

// Get all cheese origins
const getAllCheeseOrigins = async (req, res) => {
    try {
        const origins = await Origin.find({}).populate('relatedCheeses', 'name relationType');

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
// Get a specific cheese origin by ID
const getCheeseOriginById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const origin = await Origin.findById(req.params.id).populate('relatedField');

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

// Create a new origin entry
const createOrigin = async (req, res) => {
    try {
        const origin = new Origin(req.body);
        await origin.save();
        res.status(201).json({
            success: true,
            data: origin,
            message: 'Origin created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update an origin entry by ID
const updateOriginById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const updatedOrigin = await Origin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrigin) {
            return res.status(404).json({
                success: false,
                message: 'Origin not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedOrigin,
            message: 'Origin updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Delete an origin entry by ID
const deleteOriginById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const deletedOrigin = await Origin.findByIdAndDelete(req.params.id);
        if (!deletedOrigin) {
            return res.status(404).json({
                success: false,
                message: 'Origin not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Origin deleted successfully'
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
    getCheeseOriginById,
    createOrigin,
    updateOriginById,
    deleteOriginById
};