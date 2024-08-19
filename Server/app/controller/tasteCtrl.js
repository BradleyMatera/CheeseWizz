const mongoose = require('mongoose');
const Taste = require('../models/tasteSchema');
const Cheese = require('../models/cheeseModel');

// Get all cheese tastes
const getAllCheeseTastes = async (req, res) => {
    try {
        const tastes = await Taste.find({})
            .populate({
                path: 'cheeses',
                select: 'name age origin',
                populate: { path: 'origin', select: 'country region village history' }
            })
            .populate({
                path: 'relatedCheeses',
                select: 'name relationType'
            });
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

// Get a specific cheese taste by ID
const getCheeseTasteById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const taste = await Taste.findById(req.params.id)
            .populate({
                path: 'cheeses',
                select: 'name age origin',
                populate: { path: 'origin', select: 'country region village history' }
            })
            .populate({
                path: 'relatedCheeses',
                select: 'name relationType'
            });

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

// Create a new taste entry
const createTaste = async (req, res) => {
    try {
        const taste = new Taste(req.body);
        await taste.save();
        res.status(201).json({
            success: true,
            data: taste,
            message: 'Taste created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update a taste entry by ID
const updateTasteById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const updatedTaste = await Taste.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTaste) {
            return res.status(404).json({
                success: false,
                message: 'Taste not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedTaste,
            message: 'Taste updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Delete a taste entry by ID
const deleteTasteById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const deletedTaste = await Taste.findByIdAndDelete(req.params.id);
        if (!deletedTaste) {
            return res.status(404).json({
                success: false,
                message: 'Taste not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Taste deleted successfully'
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
    getCheeseTasteById,
    createTaste,
    updateTasteById,
    deleteTasteById
};