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
        required: true, // Ensures the array is present and contains at least one pairing
        validate: [array => array.length > 0, 'There must be at least one pairing.'] // Simplified validation
    }
});

module.exports = mongoose.model('Taste', tasteSchema); // Exporting as a Mongoose model