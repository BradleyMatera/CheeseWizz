const Origin = require('../models/originSchema');
const Cheese = require('../models/cheeseModel');
const RelatedCheese = require('../models/relatedCheeseSchema');
const Taste = require('../models/tasteSchema');
const Messages = require('../utils/messages');
const mongoose = require('mongoose');

// Fetch all origins with related data populated
const getAllCheeseOrigins = async (req, res) => {
    try {
        const origins = await Origin.find({})
            .populate({
                path: 'cheeses',
                select: 'name age nutrition ingredients',
                populate: [
                    { path: 'taste', select: 'flavor texture aroma pairings' },
                    { path: 'relatedCheeses', select: 'name relationType' }
                ]
            })
            .populate('relatedCheeses', 'name relationType')
            .populate('tastes', 'flavor texture aroma pairings');

        res.status(200).json({
            success: true,
            count: origins.length,
            data: origins,
            message: `${req.method} - Request made to origin endpoint`
        });
    } catch (error) {
        console.error('Error in getAllCheeseOrigins:', error);
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR,
            error: error.message
        });
    }
};

// Fetch a specific origin by ID with related data populated
const getCheeseOriginById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const origin = await Origin.findById(req.params.id)
            .populate({
                path: 'cheeses',
                populate: [
                    { path: 'taste', select: 'flavor texture aroma pairings' },
                    { path: 'relatedCheeses', select: 'name relationType' }
                ]
            });

        if (!origin) {
            return res.status(404).json({
                success: false,
                message: Messages.CHEESE_NOT_FOUND
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
            message: Messages.SERVER_ERROR,
            error: error.message
        });
    }
};

// Create a new origin with related data linked
const createOrigin = async (req, res) => {
    try {
        const { cheeses, relatedCheeses, tastes, ...originData } = req.body;

        const cheeseIds = await Cheese.find({
            name: { $in: cheeses.map(c => c.name) }
        }).select('_id');

        const relatedCheeseIds = await RelatedCheese.find({
            name: { $in: relatedCheeses.map(rc => rc.name) }
        }).select('_id');

        const tasteIds = await Taste.find({
            flavor: { $in: tastes.map(t => t.flavor) }
        }).select('_id');

        const origin = new Origin({
            ...originData,
            cheeses: cheeseIds,
            relatedCheeses: relatedCheeseIds,
            tastes: tasteIds
        });

        await origin.save();

        res.status(201).json({
            success: true,
            data: origin,
            message: Messages.CHEESE_CREATED
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update an existing origin by ID
const updateOriginById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const updatedOrigin = await Origin.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedOrigin) {
            return res.status(404).json({
                success: false,
                message: Messages.CHEESE_NOT_FOUND
            });
        }

        res.status(200).json({
            success: true,
            data: updatedOrigin,
            message: Messages.CHEESE_UPDATED
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR
        });
    }
};

// Delete an origin by ID
const deleteOriginById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const deletedOrigin = await Origin.findByIdAndDelete(req.params.id);

        if (!deletedOrigin) {
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
    getAllCheeseOrigins,
    getCheeseOriginById,
    createOrigin,
    updateOriginById,
    deleteOriginById
};