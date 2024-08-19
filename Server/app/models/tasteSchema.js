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
        validate: [array => array.length > 0, 'There must be at least one pairing.']
    }
});

// Create the Taste model from the schema
const Taste = mongoose.model('Taste', tasteSchema);

module.exports = Taste;