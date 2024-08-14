/*
Functions include getAllCheeseTypes, getCheeseTypeById, updateCheeseById, createCheese, deleteCheeseByID.
This handles all CRUD operations (Create, Read, Update, Delete) for the Cheese model.
Origin and taste handling are not separated into distinct controllers; 
they are managed within the Cheese model itself.
Their logic is integrated directly into the cheese operations.
*/
const mongoose = require('mongoose');
const Cheese = require('../models/cheeseModel');

const getAllCheeseTypes = async (req, res) => {
    try {
        const cheeses = await Cheese.find({});
        res.status(200).json({
            data: cheeses,
            success: true,
            message: `${req.method} - Request made to cheese endpoint`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

const getCheeseTypeById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const cheese = await Cheese.findById(req.params.id);
        if (!cheese) {
            return res.status(404).json({
                success: false,
                message: 'Cheese not found'
            });
        }

        res.status(200).json({
            data: cheese,
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

const createCheese = async (req, res) => {
    try {
        const newCheese = await Cheese.create(req.body);
        res.status(201).json({
            success: true,
            data: newCheese,
            message: `${req.method} - Request made to cheese endpoint`
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

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

module.exports = {
    getAllCheeseTypes,
    getCheeseTypeById,
    updateCheeseById,
    createCheese,
    deleteCheeseByID
};