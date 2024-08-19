const mongoose = require('mongoose'); // Importing Mongoose for interacting with MongoDB
const Cheese = require('../models/cheeseModel'); // Importing the Cheese model
const Origin = require('../models/originSchema'); // Importing the Origin sub-schema
const Taste = require('../models/tasteSchema'); // Importing the Taste sub-schema
const RelatedCheese = require('../models/relatedCheeseSchema'); // Importing the RelatedCheese sub-schema
const Messages = require('../utils/messages'); // Importing custom messages for responses

// Function to get all cheese types from the database NO REQUEST BODY
const getAllCheeseTypes = async (req, res) => { // The function is simply fetching all cheese documents from the database and does not need to read any data from the incoming request
    try {
        // Fetching all cheeses and populating related fields (origin, taste, related cheeses)
        const cheeses = await Cheese.find({})
            .populate('origin', 'country region village history') // Populating the origin field with specific sub-fields
            .populate('taste', 'flavor texture aroma pairings') // Populating the taste field with specific sub-fields
            .populate('relatedCheeses', 'name relationType'); // Populating the relatedCheeses field with specific sub-fields

        // Sending a success response with the list of cheeses
        res.status(200).json({
            success: true, // Indicates the request was successful
            count: cheeses.length, // The number of cheeses returned
            data: cheeses, // The actual data (cheeses) retrieved from the database
            message: 'Cheeses retrieved successfully' // A success message
        });
    } catch (error) {
        // Catching any errors that occur during the process and logging them
        console.error('Error in getAllCheeseTypes:', error);
        
        // Sending a server error response with the error message
        res.status(500).json({
            success: false, // Indicates the request failed
            message: 'Server Error', // A general error message
            error: error.message // The specific error message
        });
    }
};

// Function to get a specific cheese type by its ID
const getCheeseTypeById = async (req, res) => {
    try {
        // Checking if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false, // Indicates the request failed
                message: 'Invalid ID format' // Error message for an invalid ID format
            });
        }

        // Fetching the cheese by ID and populating related fields
        const cheese = await Cheese.findById(req.params.id)
            .populate({
                path: 'origin', // Populating the origin field
                select: 'country region village history' // Selecting specific sub-fields in the origin
            })
            .populate({
                path: 'taste', // Populating the taste field
                select: 'flavor texture aroma pairings' // Selecting specific sub-fields in the taste
            })
            .populate({
                path: 'relatedCheeses', // Populating the relatedCheeses field
                select: 'name relationType', // Selecting specific sub-fields in the related cheeses
                populate: {
                    path: 'cheese', // Further populating the cheese field within related cheeses
                    select: 'name' // Selecting the name field of the related cheese
                }
            });

        // If no cheese is found with the provided ID, return a 404 error
        if (!cheese) { // If cheese is null, undefined, 0, false, NaN, or an empty string, 
            return res.status(404).json({ // the expression !cheese will evaluate to true, indicating that the cheese is not found.

                success: false, // Indicates the request failed
                message: 'Cheese not found' // Error message for a non-existent cheese
            });
        }

        // Sending a success response with the found cheese data
        res.status(200).json({
            success: true, // Indicates the request was successful
            data: cheese, // The cheese data retrieved from the database
            message: `${req.method} - Request made to cheese endpoint with id ${req.params.id}` // A success message
        });
    } catch (error) {
        // Catching any errors that occur during the process and logging them
        console.error('Error in getCheeseTypeById:', error);

        // Sending a server error response with the error message
        res.status(500).json({
            success: false, // Indicates the request failed
            message: 'Server Error', // A general error message
            error: error.message // The specific error message
        });
    }
};
// Function to create a new cheese entry
const createCheese = async (req, res) => {
    try {
        // Destructuring assignment from the request body 'req.body'.
        // 'origin', 'taste', and 'relatedCheeses' are extracted, 
        // while '...cheeseData' gathers the remaining properties into a new object called 'cheeseData'.
        const { origin, taste, relatedCheeses, ...cheeseData } = req.body;

        // Creating or finding an existing Origin document.
        // 'findOneAndUpdate' searches for a document that matches the criteria ('country' and 'region').
        // If found, it updates the document with the new data; if not, it creates a new one ('upsert: true').
        // The 'new: true' option returns the updated document.
        let originDoc = await Origin.findOneAndUpdate(
            { country: origin.country, region: origin.region }, // Search criteria: 'country' and 'region'
            origin, // Data to update or insert
            { upsert: true, new: true } // Options to insert if not found and return the new document
        );

        // Creating or finding an existing Taste document.
        // Works similarly to the Origin creation, but it matches 'flavor' and 'texture'.
        let tasteDoc = await Taste.findOneAndUpdate(
            { flavor: taste.flavor, texture: taste.texture }, // Search criteria: 'flavor' and 'texture'
            taste, // Data to update or insert
            { upsert: true, new: true } // Options to insert if not found and return the new document
        );

        // Array to hold the IDs of the related cheese documents.
        let relatedCheeseDocs = [];

        // Looping through each item in the 'relatedCheeses' array.
        // Each 'relatedCheese' is processed to find or create a document.
        // The '_id' of each related cheese document is then pushed into the 'relatedCheeseDocs' array.
        for (let relatedCheese of relatedCheeses) {
            let relatedCheeseDoc = await RelatedCheese.findOneAndUpdate(
                { name: relatedCheese.name }, // Search criteria: 'name'
                relatedCheese, // Data to update or insert
                { upsert: true, new: true } // Options to insert if not found and return the new document
            );
            relatedCheeseDocs.push(relatedCheeseDoc._id); // Store the '_id' in the array
        }

        // Creating the main Cheese document.
        // The new document includes 'cheeseData' (spread into the object), 'origin', 'taste', and 'relatedCheeses'.
        // The IDs of the related documents are stored as references.
        const cheese = new Cheese({
            ...cheeseData, // Spread operator '...' adds the remaining properties of 'cheeseData'
            origin: originDoc._id, // Reference to the 'Origin' document's '_id'
            taste: tasteDoc._id, // Reference to the 'Taste' document's '_id'
            relatedCheeses: relatedCheeseDocs // Array of related cheese document IDs
        });

        // Saving the new Cheese document to the database.
        await cheese.save();

        // Populating the related fields (origin, taste, relatedCheeses) with full documents, not just IDs.
        // 'populate' replaces the IDs with the actual document content from the referenced collections.
        const populatedCheese = await Cheese.findById(cheese._id)
            .populate('origin') // Populate 'origin' with the full document
            .populate('taste') // Populate 'taste' with the full document
            .populate('relatedCheeses'); // Populate 'relatedCheeses' with full documents

        // Sending a 201 (Created) response with the populated cheese data.
        res.status(201).json({
            success: true, // Success flag for the client
            data: populatedCheese, // The fully populated cheese document
            message: Messages.CHEESE_CREATED // Success message (imported from 'Messages')
        });
    } catch (error) {
        // Catching and handling any errors that occur during the process.
        // 'console.error' logs the error for debugging purposes.
        console.error('Error in createCheese:', error);

        // Sending a 400 (Bad Request) response with an error message if something goes wrong.
        res.status(400).json({
            success: false, // Failure flag for the client
            message: Messages.ERROR_CREATING_CHEESE // Error message (imported from 'Messages')
        });
    }
};
// Function to update an existing cheese entry by its ID
const updateCheeseById = async (req, res) => {
    try {
        // Destructuring the request body to separate origin, taste, relatedCheeses, and other cheese data
        const { origin, taste, relatedCheeses, ...cheeseData } = req.body;

        // If origin data is provided, find or update the existing origin document
        // If origin is null, originDoc will also be null
        let originDoc = origin ? await Origin.findOneAndUpdate(
            { country: origin.country, region: origin.region }, // Search criteria based on country and region
            origin, // Data to update or insert
            { upsert: true, new: true } // Options to create if not found, return the updated document
        ) : null;

        // If taste data is provided, find or update the existing taste document
        // If taste is null, tasteDoc will also be null
        let tasteDoc = taste ? await Taste.findOneAndUpdate(
            { flavor: taste.flavor, texture: taste.texture }, // Search criteria based on flavor and texture
            taste, // Data to update or insert
            { upsert: true, new: true } // Options to create if not found, return the updated document
        ) : null;

        // Initialize an array to store related cheese IDs
        let relatedCheeseIds = [];
        
        // If relatedCheeses array is provided and not empty, process each related cheese
        if (relatedCheeses && relatedCheeses.length > 0) {
            for (let relatedCheese of relatedCheeses) {
                let relatedCheeseDoc = await RelatedCheese.findOneAndUpdate(
                    { name: relatedCheese.name }, // Search criteria based on name
                    relatedCheese, // Data to update or insert
                    { upsert: true, new: true } // Options to create if not found, return the updated document
                );
                relatedCheeseIds.push(relatedCheeseDoc._id); // Store the ID of the related cheese document
            }
        }

        // Update the main Cheese document with the new data
        const updatedCheese = await Cheese.findByIdAndUpdate(
            req.params.id, // The ID of the cheese to update, taken from the request parameters
            {
                ...cheeseData, // Spread operator to include the other cheese data
                origin: originDoc ? originDoc._id : undefined, // If originDoc exists, update the origin field
                taste: tasteDoc ? tasteDoc._id : undefined, // If tasteDoc exists, update the taste field
                relatedCheeses: relatedCheeseIds.length > 0 ? relatedCheeseIds : undefined // Update related cheeses if any are provided
            },
            { new: true, runValidators: true } // Options to return the new document and run schema validators
        ).populate('origin').populate('taste').populate('relatedCheeses'); // Populate the referenced fields

        // If the cheese was not found, return a 404 status with an error message
        if (!updatedCheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found'
            });
        }

        // If the update is successful, return the updated cheese data with a success message
        res.status(200).json({
            success: true,
            data: updatedCheese, // The updated cheese document with populated fields
            message: 'Cheese updated successfully' // Success message
        });
    } catch (error) {
        // Catch and log any errors that occur during the process
        console.error('Error in updateCheeseById:', error);

        // Return a 500 status with a server error message
        res.status(500).json({
            success: false,
            message: 'Server Error', // General server error message
            error: error.message // Specific error message for debugging
        });
    }
};

// Function to delete a cheese entry by its ID
const deleteCheeseByID = async (req, res) => {
    try {
        // Validate that the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format' // Error message for invalid ID
            });
        }

        // Find and delete the cheese document by its ID
        const deletedCheese = await Cheese.findByIdAndDelete(req.params.id);

        // If the cheese was not found, return a 404 status with an error message
        if (!deletedCheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found' // Error message for not found
            });
        }

        // If the deletion is successful, return the deleted cheese ID with a success message
        res.status(200).json({
            id: req.params.id, // The ID of the deleted cheese
            success: true, // Success flag
            message: 'Cheese deleted successfully' // Success message
        });
    } catch (error) {
        // Catch and log any errors that occur during the process
        console.error('Error in deleteCheeseByID:', error);

        // Return a 500 status with a server error message
        res.status(500).json({
            success: false,
            message: 'Server Error', // General server error message
            error: error.message // Specific error message for debugging
        });
    }
};

// Exporting the functions to be used in other parts of the application
module.exports = {
    getAllCheeseTypes, // Function to get all cheeses
    getCheeseTypeById, // Function to get a cheese by its ID
    createCheese, // Function to create a new cheese
    updateCheeseById, // Function to update an existing cheese by its ID
    deleteCheeseByID // Function to delete a cheese by its ID
};