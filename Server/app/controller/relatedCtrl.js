const mongoose = require('mongoose');
const RelatedCheese = require('../models/relatedCheeseSchema'); 

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

module.exports = {
    getAllRelatedCheeses,
    getRelatedCheeseById
};