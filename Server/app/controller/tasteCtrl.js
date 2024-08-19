const Taste = require('../models/tasteSchema');
const Cheese = require('../models/cheeseModel');
const Messages = require('../utils/messages');
const mongoose = require('mongoose');

const getAllCheeseTastes = async (req, res) => {
    try {
        const tastes = await Taste.find({})
            .populate({
                path: 'cheeses',
                select: 'name age nutrition origin',
                populate: {
                    path: 'origin',
                    select: 'country region'
                }
            });

        res.status(200).json({
            success: true,
            count: tastes.length,
            data: tastes,
            message: Messages.CHEESE_RETRIEVED
        });
    } catch (error) {
        console.error('Error in getAllCheeseTastes:', error);
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR,
            error: error.message
        });
    }
};

// Get a specific cheese taste by ID
const getCheeseTasteById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const taste = await Taste.findById(req.params.id)
            .populate({
                path: 'cheeses',
                populate: [
                    { path: 'origin', select: 'country region' }
                ]
            });

        if (!taste) {
            return res.status(404).json({
                success: false,
                message: Messages.CHEESE_NOT_FOUND
            });
        }

        res.status(200).json({
            success: true,
            data: taste,
            message: Messages.CHEESE_RETRIEVED
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR
        });
    }
};

// Create a new taste entry
const createTaste = async (req, res) => {
    try {
        const { cheeses, ...tasteData } = req.body;

        // Convert the references to valid ObjectIds, assuming that the incoming data uses names or other identifiers
        const cheeseIds = await Cheese.find({ name: { $in: cheeses.map(c => c.name) } }).select('_id');

        const taste = new Taste({
            ...tasteData,
            cheeses: cheeseIds
        });

        await taste.save();
        res.status(201).json({
            success: true,
            data: taste,
            message: Messages.CHEESE_CREATED
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
                message: Messages.INVALID_ID
            });
        }

        // Ensure you're passing an object and not a string
        const updatedTaste = await Taste.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTaste) {
            return res.status(404).json({
                success: false,
                message: Messages.CHEESE_NOT_FOUND
            });
        }

        res.status(200).json({
            success: true,
            data: updatedTaste,
            message: Messages.CHEESE_UPDATED
        });
    } catch (error) {
        console.error('Error in updateTasteById:', error);
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR,
            error: error.message
        });
    }
};

// Delete a taste entry by ID
const deleteTasteById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const deletedTaste = await Taste.findByIdAndDelete(req.params.id);
        if (!deletedTaste) {
            return res.status(404).json({
                success: false,
                message: Messages.CHEESE_NOT_FOUND
            });
        }

        res.status(200).json({
            success: true,
            message: Messages.CHEESE_DELETED
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR
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