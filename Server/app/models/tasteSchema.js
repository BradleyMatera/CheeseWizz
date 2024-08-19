const mongoose = require('mongoose');

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
    },
    cheeses: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cheese'
    }]
});

module.exports = mongoose.model('Taste', tasteSchema);