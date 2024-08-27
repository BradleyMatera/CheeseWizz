const mongoose = require('mongoose'); // Importing Mongoose for interacting with MongoDB
const Cheese = require('../models/cheeseModel'); // Importing the Cheese model (this represents a collection in MongoDB)
const Origin = require('../models/originSchema'); // Importing the Origin sub-schema (a part of the Cheese document)
const Taste = require('../models/tasteSchema'); // Importing the Taste sub-schema (another part of the Cheese document)
const RelatedCheese = require('../models/relatedCheeseSchema'); // Importing the RelatedCheese sub-schema (links to other cheese documents)
const Messages = require('../utils/messages'); // Importing custom messages for responses
const buildSearchCriteria = require('../utils/search'); // Importing the search criteria builder
// added because we need to use the search criteria builder to create a search query based on the search term

// Function to get all cheese types from the database NO REQUEST BODY
const getAllCheeseTypes = async (req, res) => {
    try {
        // Parse pagination parameters from query, defaulting to page 1 and limit 10
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        const sortBy = req.query.sortBy || 'name'; // Default sorting by 'name'
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; // Determine sorting order, default is ascending

        let query = {};

// Check if there's a search term in the query and format it for regex(Regular expressions) search
const searchTerm = req.query.search ? req.query.search.trim() : ''; 
// Retrieve the search term from the request query and trim any leading or trailing spaces

// Only proceed if a valid search term is provided and it's not the 'getAll' keyword
if (searchTerm && searchTerm !== 'getAll') {

// Use the search criteria builder to create a search query based on the search term
// Replace spaces in the search term with the '|' character to create an OR condition in the regex
// The '\s+' matches one or more whitespace characters (spaces, tabs, etc.), and 'g' is the global flag to replace all occurrences
// For example, "cheddar cheese" becomes "cheddar|cheese", allowing the search to match either "cheddar" OR "cheese"
const searchRegex = new RegExp(searchTerm.replace(/\s+/g, '|'), 'i'); 

// 'i' flag makes the regex case-insensitive, so it will match regardless of uppercase or lowercase letters
// The resulting regex can be used to find matches across different fields in the database
    /* 
// MongoDB's $or Operator:

// The $or operator in MongoDB lets us run logical OR queries. It returns 
// documents that match at least one of the conditions we list. So, if we're 
// searching for a term in fields like name, origin, or taste, $or will check 
// all those fields and include any document that matches any of them.

// This is really handy when you want to search across multiple fields and need 
// results that match at least one of them. It’s a core part of MongoDB’s query 
// language, often used in the `find` method to build more complex searches.

// How $or Works:

// Say we have a bunch of cheese documents. We want to find cheeses by name, 
// region, or flavor. Instead of running separate queries for each, we use $or 
// to combine these conditions into one search.

    In the context of this code:
    ----------------------------
    - { name: searchRegex }: This checks if the search term matches the 'name' field of the cheese document.
    - { 'origin.country': searchRegex }: This checks if the search term matches the 'country' field within the 'origin' embedded document.
    The search term could match in any of these fields, and if it does, the 
    document will be included in the results.

// Regular Expressions in Search:

// Regular expressions (regex) are a way to define search patterns, 
// allowing for flexible and advanced string matching.

// The 'i' flag at the end of the regex makes the search case-insensitive, so it 
// doesn’t matter if the text is uppercase or lowercase—it will still match.

// The '|' operator in the regex treats spaces in the search term as OR conditions. 
// For example, if the user types "Cheddar France", the search will find documents 
// that match either "Cheddar" OR "France" in any of the fields we specified.

    */
    query = {
        $or: [
            { name: searchRegex }, // Search by cheese name
            { 'origin.country': searchRegex }, // Search by country of origin
            { 'origin.region': searchRegex }, // Search by region of origin
            { 'origin.village': searchRegex }, // Search by village of origin
            { 'taste.flavor': searchRegex }, // Search by taste flavor
            { 'taste.texture': searchRegex }, // Search by taste texture
            { 'taste.aroma': searchRegex }, // Search by taste aroma
            { 'relatedCheeses.name': searchRegex } // Search by related cheese name
        ]
    };
}

        // Execute the query with pagination, sorting, and populating related fields
        const cheeses = await Cheese.find(query)
            .populate('origin', 'country region village history') // Populate origin details
            .populate('taste', 'flavor texture aroma pairings') // Populate taste details
            .populate('relatedCheeses', 'name relationType') // Populate related cheese details
            .sort({ [sortBy]: sortOrder }) // Sort the results
            .skip(skip) // Skip documents for pagination
            .limit(limit); // Limit the number of documents returned

        // Logging details for debugging
        console.log(`Page: ${page}, Limit: ${limit}, Skipped: ${skip}`);
        console.log(`Sorting By: ${sortBy}, Order: ${sortOrder === 1 ? 'Ascending' : 'Descending'}`);
        console.log(`Cheeses Returned: ${cheeses.length}`);

        // Return a successful response with the cheese data
        res.status(200).json({
            success: true,
            count: cheeses.length,
            data: cheeses,
            message: 'Cheeses retrieved successfully'
        });
    } catch (error) {
        // Log the error and return a server error response
        console.error('Error in getAllCheeseTypes:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Function to get a specific cheese type by its ID
const getCheeseTypeById = async (req, res) => {
    try {
        // Checking if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
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
        if (!cheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found' // Error message for a non-existent cheese
            });
        }

        // Sending a success response with the found cheese data
        res.status(200).json({
            success: true,
            data: cheese, // The cheese data retrieved from the database
            message: `${req.method} - Request made to cheese endpoint with id ${req.params.id}` // A success message
        });
    } catch (error) {
        // Catching any errors that occur during the process and logging them
        console.error('Error in getCheeseTypeById:', error);

        // Sending a server error response with the error message
        res.status(500).json({
            success: false,
            message: 'Server Error', // A general error message
            error: error.message // The specific error message
        });
    }
};

// Function to create a new cheese entry
const createCheese = async (req, res) => {
    try {
        const { origin, taste, relatedCheeses, ...cheeseData } = req.body;

        // Find or create Origin document
        let originDoc = await Origin.findOneAndUpdate(
            { country: origin.country, region: origin.region }, 
            origin, 
            { upsert: true, new: true } 
        );

        // Find or create Taste document
        let tasteDoc = await Taste.findOneAndUpdate(
            { flavor: taste.flavor, texture: taste.texture }, 
            taste, 
            { upsert: true, new: true }
        );

        // Array to hold related cheese documents' IDs
        let relatedCheeseDocs = [];

        for (let relatedCheese of relatedCheeses) {
            let relatedCheeseDoc = await RelatedCheese.findOneAndUpdate(
                { name: relatedCheese.name }, 
                relatedCheese, 
                { upsert: true, new: true } 
            );
            relatedCheeseDocs.push(relatedCheeseDoc._id);
        }

        // Creating the main Cheese document
        const cheese = new Cheese({
            ...cheeseData,
            origin: originDoc._id, 
            taste: tasteDoc._id, 
            relatedCheeses: relatedCheeseDocs 
        });

        await cheese.save();

        // Populate the newly created cheese document
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

// Function to update an existing cheese entry by its ID
const updateCheeseById = async (req, res) => {
    try {
        const { origin, taste, relatedCheeses, ...cheeseData } = req.body;

        let originDoc = origin ? await Origin.findOneAndUpdate(
            { country: origin.country, region: origin.region }, 
            origin, 
            { upsert: true, new: true }
        ) : null;

        let tasteDoc = taste ? await Taste.findOneAndUpdate(
            { flavor: taste.flavor, texture: taste.texture }, 
            taste, 
            { upsert: true, new: true }
        ) : null;

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

// Function to delete a cheese entry by its ID
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

// Exporting the functions to be used in other parts of the application
module.exports = {
    getAllCheeseTypes, 
    getCheeseTypeById, 
    createCheese, 
    updateCheeseById, 
    deleteCheeseByID 
};