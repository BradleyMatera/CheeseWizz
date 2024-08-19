const mongoose = require('mongoose');
const RelatedCheese = require('../models/relatedCheeseSchema');
const Cheese = require('../models/cheeseModel');
const Origin = require('../models/originSchema');
const Taste = require('../models/tasteSchema');
const Messages = require('../utils/messages');

// Get all related cheeses
const getAllRelatedCheeses = async (req, res) => {
    try {
        const relatedCheeses = await RelatedCheese.find({})
            .populate({
                path: 'cheese',
                select: 'name age nutrition origin taste relatedCheeses',
                populate: [
                    { path: 'origin', select: 'country region village history' },
                    { path: 'taste', select: 'flavor texture aroma pairings' },
                    { path: 'relatedCheeses', select: 'name relationType' }
                ]
            });

        res.status(200).json({
            success: true,
            count: relatedCheeses.length,
            data: relatedCheeses,
            message: Messages.CHEESE_RETRIEVED
        });
    } catch (error) {
        console.error('Error in getAllRelatedCheeses:', error);
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR,
            error: error.message
        });
    }
};

// Get a specific related cheese by ID
const getRelatedCheeseById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const relatedCheese = await RelatedCheese.findById(req.params.id)
            .populate({
                path: 'cheese',
                select: 'name age nutrition origin taste relatedCheeses',
                populate: [
                    { path: 'origin', select: 'country region village history' },
                    { path: 'taste', select: 'flavor texture aroma pairings' },
                    { path: 'relatedCheeses', select: 'name relationType' }
                ]
            });

        if (!relatedCheese) {
            return res.status(404).json({
                success: false,
                message: Messages.CHEESE_NOT_FOUND
            });
        }

        res.status(200).json({
            success: true,
            data: relatedCheese,
            message: Messages.CHEESE_RETRIEVED
        });
    } catch (error) {
        console.error('Error in getRelatedCheeseById:', error);
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR,
            error: error.message
        });
    }
};

// Create a new related cheese entry
const createRelatedCheese = async (req, res) => {
  try {
    const relatedCheeseData = req.body;
   const relatedCheese = new RelatedCheese(relatedCheeseData);

    await relatedCheese.save();

    res.status(201).json({ success: true, data: relatedCheese, message: Messages.CHEESE_CREATED });
  } catch (error) {
    console.error('Error in createRelatedCheese:', error);
    res.status(400).json({ success: false, message: Messages.ERROR_CREATING_CHEESE, error: error.message });
  }
};

// Update a related cheese entry by ID
const updateRelatedCheeseById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

// Update the related cheese document and populate related fields for detailed response
const updatedRelatedCheese = await RelatedCheese.findByIdAndUpdate(
    req.params.id, // The ID of the related cheese to update, taken from the request parameters
    req.body, // The data to update in the related cheese document
    { new: true } // Return the updated document after the operation
)
.populate({
    path: 'cheese', // Populate the 'cheese' field
    select: 'name age nutrition origin taste relatedCheeses', // Select specific fields to include
    populate: [
        { path: 'origin', select: 'country region village history' }, // Populate and select fields for 'origin'
        { path: 'taste', select: 'flavor texture aroma pairings' }, // Populate and select fields for 'taste'
        { path: 'relatedCheeses', select: 'name relationType' } // Populate and select fields for 'relatedCheeses'
    ]
});

// Logical NOT operator (!) to check if the related cheese was not found, 
// returning a 404 status if the document does not exist in the database
if (!updatedRelatedCheese) {
    return res.status(404).json({
        success: false, // Indicate the request failed
        message: Messages.CHEESE_NOT_FOUND // Message indicating the cheese was not found
    });
}

        res.status(200).json({
            success: true,
            data: updatedRelatedCheese,
            message: Messages.CHEESE_UPDATED
        });
    } catch (error) {
        console.error('Error in updateRelatedCheeseById:', error);
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR,
            error: error.message
        });
    }
};

// Delete a related cheese entry by ID
const deleteRelatedCheeseById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const deletedRelatedCheese = await RelatedCheese.findByIdAndDelete(req.params.id);
        if (!deletedRelatedCheese) {
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
        console.error('Error in deleteRelatedCheeseById:', error);
        res.status(500).json({
            success: false,
            message: Messages.SERVER_ERROR,
            error: error.message
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