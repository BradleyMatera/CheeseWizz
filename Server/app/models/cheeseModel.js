const mongoose = require('mongoose');

// Define the main cheese schema
const cheeseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true, 
        minLength: 3, 
        maxLength: 100 
    },
    age: { 
        type: Number, 
        required: true, 
        min: 0, 
        max: 100 
    },
    origin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Origin',
        required: true 
    }, // Reference the origin schema
    taste: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Taste',
        required: true 
    }, // Reference the taste schema
    relatedCheeses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RelatedCheese'
    }], // Reference the related cheese schema as an array
    ingredients: { 
        type: [String], 
        required: true, // Ensures the array is present and contains at least one ingredient
        validate: [array => array.length > 0, 'There must be at least one ingredient.'] // Simplified validation
    },
    production: {
        method: { 
            type: String, 
            maxLength: 500 
        },
        aged: { 
            type: String, 
            enum: ['fresh', 'aged', 'extra aged', '1 month'], 
            maxLength: 100 
        },
        location: { 
            type: String, 
            maxLength: 100 
        }
    },
    awards: [{
        name: { 
            type: String, 
            maxLength: 100 
        },
        event: { 
            type: String, 
            maxLength: 100 
        },
        year: { 
            type: Number, 
            min: 1000, 
            max: 9999 
        }
    }],
    nutrition: {
        calories: { 
            type: Number, 
            min: 0 
        },
        fat: { 
            type: String, 
            maxLength: 50 
        },
        protein: { 
            type: String, 
            maxLength: 50 
        },
        carbohydrates: { 
            type: String, 
            maxLength: 50 
        }
    }
});

// Create the Cheese model from the schema
const Cheese = mongoose.model('Cheese', cheeseSchema);

module.exports = Cheese;