const mongoose = require('mongoose'); // Importing Mongoose for interacting with MongoDB
const Origin = require('../models/originSchema'); // Importing the Origin model
const Cheese = require('../models/cheeseModel'); // Importing the Cheese model
const RelatedCheese = require('../models/relatedCheeseSchema'); // Importing the RelatedCheese model
const Taste = require('../models/tasteSchema'); // Importing the Taste model
const Messages = require('../utils/messages'); // Importing custom messages for responses
const buildSearchCriteria = require('../utils/search'); // Importing the search criteria builder

// Function to retrieve all origins, optionally filtered by a search term
const getAllCheeseOrigins = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit; 
        const sortBy = req.query.sortBy || 'country'; 
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

        let query = {};

        const searchTerm = req.query.search ? req.query.search.trim() : '';
        if (searchTerm && searchTerm !== 'getAll') {
            const searchRegex = new RegExp(searchTerm, 'i');
            query = {
                $or: [
                    { country: searchRegex },
                    { region: searchRegex },
                    { village: searchRegex },
                    { history: searchRegex }
                ]
            };
        }

        const origins = await Origin.find(query)
            .populate('cheeses', 'name age')
            .populate('relatedCheeses', 'name relationType')
            .populate('tastes', 'flavor texture aroma')
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            count: origins.length,
            data: origins,
            message: origins.length > 0 ? 'Origins retrieved successfully.' : 'No results found for the search term.'
        });
    } catch (error) {
        console.error('Error in getAllCheeseOrigins:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Function to retrieve a single origin by ID
const getCheeseOriginById = async (req, res) => {
    try {
        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        // Find the origin by ID and populate related fields
        const origin = await Origin.findById(req.params.id)
            .populate('cheeses', 'name age nutrition ingredients') // Populate cheeses with additional fields
            .populate('relatedCheeses', 'name relationType') // Populate related cheeses
            .populate('tastes', 'flavor texture aroma pairings'); // Populate tastes

        if (!origin) {
            return res.status(404).json({
                success: false,
                message: Messages.CHEESE_NOT_FOUND
            });
        }

        res.status(200).json({
            success: true,
            data: origin,
            message: 'Origin retrieved successfully'
        });
    } catch (error) {
        console.error('Error in getCheeseOriginById:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Function to create a new origin
const createOrigin = async (req, res) => {
    try {
        const { cheeses, relatedCheeses, tastes, ...originData } = req.body;

        // Find IDs of the related entities based on their names/flavors
        const cheeseIds = await Cheese.find({
            name: { $in: cheeses.map(c => c.name) }
        }).select('_id');

        const relatedCheeseIds = await RelatedCheese.find({
            name: { $in: relatedCheeses.map(rc => rc.name) }
        }).select('_id');

        const tasteIds = await Taste.find({
            flavor: { $in: tastes.map(t => t.flavor) }
        }).select('_id');

        // Create a new Origin document with the collected data
        const origin = new Origin({
            ...originData,
            cheeses: cheeseIds,
            relatedCheeses: relatedCheeseIds,
            tastes: tasteIds
        });

        // Save the new Origin document to the database
        await origin.save();

        res.status(201).json({
            success: true,
            data: origin,
            message: Messages.CHEESE_CREATED
        });
    } catch (error) {
        console.error('Error in createOrigin:', error);
        res.status(400).json({
            success: false,
            message: Messages.ERROR_CREATING_CHEESE,
            error: error.message
        });
    }
};

// Function to update an existing origin by ID
const updateOriginById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const { cheeses, relatedCheeses, tastes, ...originData } = req.body;

        // Find IDs of the related entities based on their names/flavors
        const cheeseIds = await Cheese.find({
            name: { $in: cheeses.map(c => c.name) }
        }).select('_id');

        const relatedCheeseIds = await RelatedCheese.find({
            name: { $in: relatedCheeses.map(rc => rc.name) }
        }).select('_id');

        const tasteIds = await Taste.find({
            flavor: { $in: tastes.map(t => t.flavor) }
        }).select('_id');

        // Update the Origin document by ID with the new data
        const updatedOrigin = await Origin.findByIdAndUpdate(req.params.id, {
            ...originData,
            cheeses: cheeseIds,
            relatedCheeses: relatedCheeseIds,
            tastes: tasteIds
        }, { new: true });

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
        console.error('Error in updateOriginById:', error);
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR,
            error: error.message
        });
    }
};

// Function to delete an origin by ID
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
        console.error('Error in deleteOriginById:', error);
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR,
            error: error.message
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