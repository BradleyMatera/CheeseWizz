const mongoose = require('mongoose');
const Cheese = require('../models/cheeseModel');
const Origin = require('../models/originSchema');
const Taste = require('../models/tasteSchema');
const RelatedCheese = require('../models/relatedCheeseSchema');
const Messages = require('../utils/messages');

const getAllCheeseTypes = async (req, res) => {
    try {
        const cheeses = await Cheese.find({})
            .populate('origin', 'country region village history')
            .populate('taste', 'flavor texture aroma pairings')
            .populate('relatedCheeses', 'name relationType');

        res.status(200).json({
            success: true,
            count: cheeses.length,
            data: cheeses,
            message: 'Cheeses retrieved successfully'
        });
    } catch (error) {
        console.error('Error in getAllCheeseTypes:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
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
            .populate({
                path: 'origin',
                select: 'country region village history'
            })
            .populate({
                path: 'taste',
                select: 'flavor texture aroma pairings'
            })
            .populate({
                path: 'relatedCheeses',
                select: 'name relationType',
                populate: {
                    path: 'cheese',
                    select: 'name'
                }
            });

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
        console.error('Error in getCheeseTypeById:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Create a new cheese entry
const createCheese = async (req, res) => {
    try {
        const { origin, taste, relatedCheeses, ...cheeseData } = req.body;

        // Create or find Origin
        let originDoc = await Origin.findOneAndUpdate(
            { country: origin.country, region: origin.region },
            origin,
            { upsert: true, new: true }
        );

        // Create or find Taste
        let tasteDoc = await Taste.findOneAndUpdate(
            { flavor: taste.flavor, texture: taste.texture },
            taste,
            { upsert: true, new: true }
        );

        // Create RelatedCheese documents
        let relatedCheeseDocs = [];
        for (let relatedCheese of relatedCheeses) {
            let relatedCheeseDoc = await RelatedCheese.findOneAndUpdate(
                { name: relatedCheese.name },
                relatedCheese,
                { upsert: true, new: true }
            );
            relatedCheeseDocs.push(relatedCheeseDoc._id);
        }

        // Create the main Cheese document
        const cheese = new Cheese({
            ...cheeseData,
            origin: originDoc._id,
            taste: tasteDoc._id,
            relatedCheeses: relatedCheeseDocs
        });

        await cheese.save();

        // Populate the related fields before sending the response
        const populatedCheese = await Cheese.findById(cheese._id)
            .populate('origin')
            .populate('taste')
            .populate('relatedCheeses');

        res.status(201).json({
            success: true,
            data: populatedCheese,
            message: Messages.CHEESE_CREATED
        });
    } catch (error) {
        console.error('Error in createCheese:', error);
        res.status(400).json({
            success: false,
            message: Messages.ERROR_CREATING_CHEESE
        });
    }
};

// Update an existing cheese entry by ID
const updateCheeseById = async (req, res) => {
    try {
        const { origin, taste, relatedCheeses, ...cheeseData } = req.body;

        // Update or create Origin
        let originDoc = origin ? await Origin.findOneAndUpdate(
            { country: origin.country, region: origin.region },
            origin,
            { upsert: true, new: true }
        ) : null;

        // Update or create Taste
        let tasteDoc = taste ? await Taste.findOneAndUpdate(
            { flavor: taste.flavor, texture: taste.texture },
            taste,
            { upsert: true, new: true }
        ) : null;

        // Update or create RelatedCheeses
        let relatedCheeseIds = [];
        if (relatedCheeses && relatedCheeses.length > 0) {
            for (let relatedCheese of relatedCheeses) {
                let relatedCheeseDoc = await RelatedCheese.findOneAndUpdate(
                    { name: relatedCheese.name },
                    relatedCheese,
                    { upsert: true, new: true }
                );
                relatedCheeseIds.push(relatedCheeseDoc._id);
            }
        }

        // Update the main Cheese document
        const updatedCheese = await Cheese.findByIdAndUpdate(
            req.params.id,
            {
                ...cheeseData,
                origin: originDoc ? originDoc._id : undefined,
                taste: tasteDoc ? tasteDoc._id : undefined,
                relatedCheeses: relatedCheeseIds.length > 0 ? relatedCheeseIds : undefined
            },
            { new: true, runValidators: true }
        ).populate('origin').populate('taste').populate('relatedCheeses');

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
        console.error('Error in updateCheeseById:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
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
        console.error('Error in deleteCheeseByID:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
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