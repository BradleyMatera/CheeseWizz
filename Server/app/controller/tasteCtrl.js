const Taste = require('../models/tasteSchema');
const Cheese = require('../models/cheeseModel');
const Messages = require('../utils/messages');
const mongoose = require('mongoose');
const buildSearchCriteria = require('../utils/search'); // Importing the search criteria builder

const getAllCheeseTastes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit; 
        const sortBy = req.query.sortBy || 'flavor'; 
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

        let query = {};

        const searchTerm = req.query.search ? req.query.search.trim() : '';
        if (searchTerm && searchTerm !== 'getAll') {
            const searchRegex = new RegExp(searchTerm, 'i');
            query = { flavor: searchRegex };
        }

        const tastes = await Taste.find(query)
            .populate({
                path: 'cheeses',
                select: 'name age nutrition origin',
                populate: {
                    path: 'origin',
                    select: 'country region'
                }
            })
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit);

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
        console.error('Error in getCheeseTasteById:', error);
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR,
            error: error.message
        });
    }
};

const createTaste = async (req, res) => {
    try {
        const { cheeses, ...tasteData } = req.body;

        const cheeseIds = await Cheese.find({
            name: { $in: cheeses.map(c => c.name) }
        }).select('_id');

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
        console.error('Error in createTaste:', error);
        res.status(400).json({
            success: false,
            message: Messages.ERROR_CREATING_CHEESE,
            error: error.message
        });
    }
};

const updateTasteById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const { cheeses, ...tasteData } = req.body;

        const cheeseIds = await Cheese.find({
            name: { $in: cheeses.map(c => c.name) }
        }).select('_id');

        const updatedTaste = await Taste.findByIdAndUpdate(req.params.id, {
            ...tasteData,
            cheeses: cheeseIds
        }, { new: true });

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
        console.error('Error in deleteTasteById:', error);
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR,
            error: error.message
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