const mongoose = require('mongoose'); // Importing Mongoose, which is a library that helps connect to MongoDB and define the structure of your data (Schema).
const Cheese = require('../models/cheeseModel'); // Importing the Cheese model, which represents the structure (Schema) of cheese data in the database.

const getAllCheeseTypes = async (req, res) => { // Asynchronous function to handle a GET request to retrieve all cheese types.
    try {
        // Await is used here to wait for the result of the database query before proceeding. Cheese.find({}) retrieves all cheese entries.
        const cheeses = await Cheese.find({}); // https://mongoosejs.com/docs/queries.html

        // Responds to the client with a success message and the data retrieved from the database.
        res.status(200).json({
            data: cheeses,
            success: true,
            message: `${req.method} - Request made to cheese endpoint`
        });
    } catch (error) {
        // If an error occurs during the database query, catch it and respond with a server error message.
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

const getCheeseTypeById = async (req, res) => { // Function to handle a GET request to retrieve a specific cheese type by its ID.
    try {
        // Validate if the provided ID in the request parameters is a valid MongoDB ObjectID.
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { // https://mongoosejs.com/docs/validation.html
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        // Await the result of finding a cheese by its ID. If no cheese is found, handle it gracefully.
        const cheese = await Cheese.findById(req.params.id); // https://mongoosejs.com/docs/queries.html
        if (!cheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found'
            });
        }

        // Responds to the client with the found cheese data.
        res.status(200).json({
            data: cheese,
            success: true,
            message: `${req.method} - Request made to cheese endpoint with id ${req.params.id}`
        });
    } catch (error) {
        // If an error occurs during the database query, catch it and respond with a server error message.
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

const createCheese = async (req, res) => { // Function to handle a POST request to create a new cheese entry in the database.
    try {
        // Use Cheese.create() to add a new cheese entry based on the request body data.
        const newCheese = await Cheese.create(req.body); // https://mongoosejs.com/docs/models.html#constructing-documents

        // Responds to the client confirming the creation of a new cheese entry.
        res.status(201).json({
            success: true,
            data: newCheese,
            message: `${req.method} - Request made to cheese endpoint`
        });
    } catch (error) {
        // If an error occurs, such as validation errors, catch it and respond with a relevant error message.
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateCheeseById = async (req, res) => { // Function to handle a PUT request to update an existing cheese entry by its ID.
    try {
        // Validate if the provided ID in the request parameters is a valid MongoDB ObjectID.
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { // https://mongoosejs.com/docs/validation.html
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        // Use Cheese.findByIdAndUpdate() to find the cheese by ID and update it with the new data provided in the request body.
        const updatedCheese = await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true }); // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        if (!updatedCheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found'
            });
        }

        // Responds to the client confirming the update of the cheese entry.
        res.status(200).json({
            data: updatedCheese,
            success: true,
            message: `${req.method} - Request made to cheese endpoint with id ${req.params.id}`
        });
    } catch (error) {
        // If an error occurs during the update process, catch it and respond with a server error message.
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

const deleteCheeseByID = async (req, res) => { // Function to handle a DELETE request to remove a cheese entry by its ID.
    try {
        // Validate if the provided ID in the request parameters is a valid MongoDB ObjectID.
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { // https://mongoosejs.com/docs/validation.html
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        // Use Cheese.findByIdAndDelete() to find the cheese by ID and remove it from the database.
        const deletedCheese = await Cheese.findByIdAndDelete(req.params.id); // https://mongoosejs.com/docs/models.html#constructing-documents
        if (!deletedCheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found'
            });
        }

        // Responds to the client confirming the deletion of the cheese entry.
        res.status(200).json({
            id: req.params.id,
            success: true,
            message: `${req.method} - Request made to cheese endpoint with id ${req.params.id}`
        });
    } catch (error) {
        // If an error occurs during the delete process, catch it and respond with a server error message.
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Exporting the functions to be used elsewhere in the application.
module.exports = {
    getAllCheeseTypes,
    getCheeseTypeById,
    updateCheeseById,
    createCheese,
    deleteCheeseByID
};