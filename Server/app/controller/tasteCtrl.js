const mongoose = require('mongoose');
const Taste = require('../models/tasteSchema'); 

const getAllCheeseTastes = async (req, res) => {
    try {
        const tastes = await Taste.find({});
        res.status(200).json({
            success: true,
            data: tastes,
            message: `${req.method} - Request made to taste endpoint`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

const getCheeseTasteById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const taste = await Taste.findById(req.params.id);
        if (!taste) {
            return res.status(404).json({
                success: false,
                message: 'Taste not found'
            });
        }

        res.status(200).json({
            success: true,
            data: taste,
            message: `${req.method} - Request made to taste endpoint with id ${req.params.id}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = {
    getAllCheeseTastes,
    getCheeseTasteById
};