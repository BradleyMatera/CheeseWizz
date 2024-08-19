const mongoose = require('mongoose');

// Define the taste schema
const tasteSchema = new mongoose.Schema({
    flavor: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },
    texture: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },
    aroma: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },
    pairings: { 
        type: [String], 
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'There must be at least one pairing.'
        }
    }
});

module.exports = tasteSchema;