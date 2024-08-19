const mongoose = require('mongoose'); // Importing Mongoose, a MongoDB object modeling tool.
const Cheese = require('../models/cheeseModel'); // Importing the Cheese model to interact with the cheese collection in the database.

// Function to get all cheese types.
const getAllCheeseTypes = async (req, res) => {
    try {
        const cheeses = await Cheese.find({}); // Retrieve all cheese entries.
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

// Function to get a specific cheese type by its ID.
const getCheeseTypeById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { // Validate if the provided ID is a valid MongoDB ObjectID.
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const cheese = await Cheese.findById(req.params.id); // Retrieve cheese by ID.
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

// Function to create a new cheese entry in the database.
const createCheese = async (req, res) => { // Request and response parameters.
    try { // Try to create a new cheese entry.
        const { newCheese } = req.body; // Extract the new cheese ID from the request body data.
        const user = await Cheese.findById(newCheese); // Find the cheese by ID.
        if (!user) { // Check if the cheese exists.
            return res.status(404).json({ 
                success: false, 
                message: 'Cheese not found' });}
        const cheeseData = new Cheese(req.body); // Create a new cheese entry based on the request body data.
        cheeseData.relatedCheese = user; // Assign the found cheese to the relatedCheese field.
        user.relatedCheese.push(cheeseData._id); // Push the new cheese entry ID to the user's relatedCheese array.
        const queries = [cheeseData.save(), user.save()]; // Save both the new cheese entry and the updated user.
        await Promise.all(queries); // Wait for both save operations to complete.
        res.status(201).json({ 
            success: true, 
            data: cheeseData, 
            message: `${req.method} - Cheese created successfully` 
        });
    } catch (error) { // Catch any errors during the process.
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Function to update an existing cheese entry by its ID.
const updateCheeseById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const updatedCheese = await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        if (!updatedCheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found'
            });
        }

        res.status(200).json({
            data: updatedCheese,
            success: true,
            message: `${req.method} - Request made to cheese endpoint with id ${req.params.id}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Function to delete a cheese entry by its ID.
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
            message: `${req.method} - Request made to cheese endpoint with id ${req.params.id}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Exporting all functions.
module.exports = {
    getAllCheeseTypes,
    getCheeseTypeById,
    createCheese,
    updateCheeseById,
    deleteCheeseByID
};