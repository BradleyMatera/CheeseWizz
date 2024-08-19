const mongoose = require('mongoose');

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
    },
    taste: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Taste',
        required: true 
    },
    relatedCheeses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RelatedCheese'
    }],
    ingredients: { 
        type: [String], 
        required: true, 
        validate: [array => array.length > 0, 'There must be at least one ingredient.']
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

const Cheese = mongoose.model('Cheese', cheeseSchema);

module.exports = Cheese;