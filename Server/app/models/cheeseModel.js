const mongoose = require('mongoose');
const originSchema = require('./originSchema'); // Import the origin schema
const tasteSchema = require('./tasteSchema'); // Import the taste schema

// Define the related cheese schema
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
    }
});

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
        type: originSchema, 
        required: true 
    }, // Embed the origin schema
    taste: { 
        type: tasteSchema, 
        required: true 
    }, // Embed the taste schema
    ingredients: { 
        type: [String], 
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'There must be at least one ingredient.'
        }
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