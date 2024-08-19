const mongoose = require('mongoose');
const RelatedCheese = require('../models/relatedCheeseSchema');

// Get all related cheeses
const getAllRelatedCheeses = async (req, res) => {
    try {
        const relatedCheeses = await RelatedCheese.find({});
        res.status(200).json({
            success: true,
            data: relatedCheeses,
            message: `${req.method} - Request made to related cheese endpoint`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Get a specific related cheese by ID
const getRelatedCheeseById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const relatedCheese = await RelatedCheese.findById(req.params.id);
        if (!relatedCheese) {
            return res.status(404).json({
                success: false,
                message: 'Related cheese not found'
            });
        }

        res.status(200).json({
            success: true,
            data: relatedCheese,
            message: `${req.method} - Request made to related cheese endpoint with id ${req.params.id}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Create a new related cheese entry
const createRelatedCheese = async (req, res) => {
    try {
        const relatedCheese = new RelatedCheese(req.body);
        await relatedCheese.save();
        res.status(201).json({
            success: true,
            data: relatedCheese,
            message: 'Related cheese created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update a related cheese entry by ID
const updateRelatedCheeseById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const updatedCheese = await RelatedCheese.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCheese) {
            return res.status(404).json({
                success: false,
                message: 'Related cheese not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedCheese,
            message: 'Related cheese updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Delete a related cheese entry by ID
const deleteRelatedCheeseById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const deletedCheese = await RelatedCheese.findByIdAndDelete(req.params.id);
        if (!deletedCheese) {
            return res.status(404).json({
                success: false,
                message: 'Related cheese not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Related cheese deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = {
    getAllRelatedCheeses,
    getRelatedCheeseById,
    createRelatedCheese,
    updateRelatedCheeseById,
    deleteRelatedCheeseById
};