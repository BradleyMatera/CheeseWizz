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
    type: mongoose.Schema.Types.ObjectId, // Mongoose ObjectId reference type
    ref: 'Cheese' // Reference to the Cheese model
},
origin: {  
    country: { type: String, maxLength: 100 }, // Country string field with a maximum length of 100
    region: { type: String, maxLength: 100 }, // Region string field with a maximum length of 100
    village: { type: String, maxLength: 100 }, // Village string field with a maximum length of 100
    history: { type: String, maxLength: 500 } // History string field with a maximum length of 500
},
taste: {  
    flavor: { type: String, maxLength: 100 }, // Flavor string field with a maximum length of 100
    texture: { type: String, maxLength: 100 }, // Texture string field with a maximum length of 100
    aroma: { type: String, maxLength: 100 }, // Aroma string field with a maximum length of 100
    pairings: [{ type: String, maxLength: 100 }] // Array of string pairings, each with a maximum length of 100
},
relatedCheeses: [{  
    type: mongoose.Schema.Types.ObjectId, // Mongoose ObjectId array for related cheeses
    ref: 'RelatedCheese' // Reference to the RelatedCheese model
}],
pairings: { 
    type: [String], // Array of strings for pairings
    validate: [array => array.length > 0, 'There must be at least one pairing.'] // Custom validation using arrow function to ensure at least one pairing exists
}
});

module.exports = mongoose.model('RelatedCheese', relatedCheeseSchema);