const mongoose = require('mongoose');
const Cheese = require('../models/cheeseModel');
const Origin = require('../models/originSchema');
const Taste = require('../models/tasteSchema');
const RelatedCheese = require('../models/relatedCheeseSchema');

// Get all cheese types
const getAllCheeseTypes = async (req, res) => {
    try {
        const cheeses = await Cheese.find({})
            .populate('taste', 'flavor texture aroma')
            .populate('origin', 'country region village history')
            .populate('relatedCheeses', 'name relationType');
        res.status(200).json({
            success: true,
            data: cheeses,
            message: `${req.method} - Request made to cheese endpoint`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Get a specific cheese type by ID
const getCheeseTypeById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const cheese = await Cheese.findById(req.params.id)
            .populate('taste', 'flavor texture aroma')
            .populate('origin', 'country region village history')
            .populate('relatedCheeses', 'name relationType');

        if (!cheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found'
            });
        }

        res.status(200).json({
            success: true,
            data: cheese,
            message: `${req.method} - Request made to cheese endpoint with id ${req.params.id}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Create a new cheese entry
const createCheese = async (req, res) => {
    try {
        const cheeseData = new Cheese(req.body);

        // If `relatedCheeses` are provided, ensure they're linked correctly
        if (req.body.relatedCheeses && req.body.relatedCheeses.length > 0) {
            const relatedCheeses = await RelatedCheese.find({
                _id: { $in: req.body.relatedCheeses }
            });
            if (relatedCheeses.length !== req.body.relatedCheeses.length) {
                return res.status(404).json({
                    success: false,
                    message: 'One or more related cheeses not found'
                });
            }
            cheeseData.relatedCheeses = relatedCheeses.map(cheese => cheese._id);
        }

        await cheeseData.save();

        res.status(201).json({
            success: true,
            data: cheeseData,
            message: `${req.method} - Cheese created successfully`
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update an existing cheese entry by ID
const updateCheeseById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const updatedCheese = await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('taste', 'flavor texture aroma')
            .populate('origin', 'country region village history')
            .populate('relatedCheeses', 'name relationType');

        if (!updatedCheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedCheese,
            message: 'Cheese updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Delete a cheese entry by ID
const deleteCheeseByID = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const deletedCheese = await Cheese.findByIdAndDelete(req.params.id);
        if (!deletedCheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found'
            });
        }

        res.status(200).json({
            id: req.params.id,
            success: true,
            message: 'Cheese deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = {
    getAllCheeseTypes,
    getCheeseTypeById,
    createCheese,
    updateCheeseById,
    deleteCheeseByID
};