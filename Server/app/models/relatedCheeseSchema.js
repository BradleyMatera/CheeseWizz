const mongoose = require('mongoose');

const relatedCheeseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },
    relationType: { 
        type: String, 
        enum: ['similar', 'complementary'], 
        required: true 
    },
    cheese: {  
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cheese'
    },
    origin: {  
        country: { type: String, maxLength: 100 },
        region: { type: String, maxLength: 100 },
        village: { type: String, maxLength: 100 },
        history: { type: String, maxLength: 500 }
    },
    taste: {  
        flavor: { type: String, maxLength: 100 },
        texture: { type: String, maxLength: 100 },
        aroma: { type: String, maxLength: 100 },
        pairings: [{ type: String, maxLength: 100 }]
    },
    relatedCheeses: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RelatedCheese'
    }],
    pairings: { 
        type: [String], 
        validate: [array => array.length > 0, 'There must be at least one pairing.']
    }
});

module.exports = mongoose.model('RelatedCheese', relatedCheeseSchema);