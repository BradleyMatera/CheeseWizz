const Origin = require('../models/originSchema');
const Cheese = require('../models/cheeseModel');
const RelatedCheese = require('../models/relatedCheeseSchema');
const Taste = require('../models/tasteSchema');
const Messages = require('../utils/messages');
const mongoose = require('mongoose');

// In the Origin controller, nested populations are used to fully connect the data between origins, cheeses, tastes, and related cheeses.
// This approach ensures that when an origin is requested, all related entities are included in the response.
// This is particularly important for complex data models where related entities are interdependent.

const getAllCheeseOrigins = async (req, res) => {
    try {
        const origins = await Origin.find({})
            .populate({
                path: 'cheeses', // Populates the 'cheeses' field with the referenced Cheese documents.
                select: 'name age nutrition ingredients', // Only specific fields are selected to optimize the response.
                populate: [
                    { path: 'taste', select: 'flavor texture aroma pairings' }, // Populates the 'taste' field within each cheese.
                    { path: 'relatedCheeses', select: 'name relationType' } // Populates the 'relatedCheeses' field within each cheese.
                ]
            })
            .populate('relatedCheeses', 'name relationType') // Populates the 'relatedCheeses' field for the origin itself.
            .populate('tastes', 'flavor texture aroma pairings'); // Populates the 'tastes' field for the origin itself.

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

// Get a specific cheese origin by ID
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

// Create a new origin entry
const createOrigin = async (req, res) => {
    try {
        const { cheeses, relatedCheeses, tastes, ...originData } = req.body;

// Convert the references to valid ObjectIds, assuming that the incoming data uses names or other identifiers

// cheeseIds will store an array of ObjectId references to the Cheese model
const cheeseIds = await Cheese.find({
    name: { $in: cheeses.map(c => c.name) } // $in operator checks if the name exists in the provided array,$in operator selects the documents where the value of a field equals any value in the specified array.
}).select('_id'); // select() is used here to only return the '_id' field

// relatedCheeseIds will store an array of ObjectId references to the RelatedCheese model
const relatedCheeseIds = await RelatedCheese.find({
    name: { $in: relatedCheeses.map(rc => rc.name) } // $in operator checks if the name exists in the provided array
}).select('_id'); // select() is used here to only return the '_id' field

// tasteIds will store an array of ObjectId references to the Taste model
const tasteIds = await Taste.find({
    flavor: { $in: tastes.map(t => t.flavor) } // $in operator checks if the flavor exists in the provided array
}).select('_id'); // select() is used here to only return the '_id' field

// Create a new Origin document with the provided data and associated ObjectIds
const origin = new Origin({
    ...originData, // Spread operator to include all properties from originData
    cheeses: cheeseIds, // Assign the array of cheese ObjectIds to the cheeses field
    relatedCheeses: relatedCheeseIds, // Assign the array of related cheese ObjectIds to the relatedCheeses field
    tastes: tasteIds // Assign the array of taste ObjectIds to the tastes field
});

// Save the newly created Origin document to the database
await origin.save();

// Send a success response with the created Origin document and a success message
res.status(201).json({
    success: true, // Indicates the request was successful
    data: origin, // The newly created Origin document
    message: Messages.CHEESE_CREATED // Success message from the Messages module
});
} catch (error) {
    // If there's an error, send a failure response with the error message
    res.status(400).json({
        success: false, // Indicates the request failed
        message: error.message // The specific error message for debugging
    });
}
};

// Update an origin entry by ID
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

// Delete an origin entry by ID
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