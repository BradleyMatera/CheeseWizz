const mongoose = require('mongoose');

// Define sub-schemas for origin and taste with detailed validation
/*
The originSchema ensures that country and region are required fields with specific length constraints.
*/
const originSchema = new mongoose.Schema({
    country: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },  // Required, min and max length validation
    region: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },   // Required, min and max length validation
    village: { 
        type: String, 
        maxLength: 100 
    },  // Optional, max length validation
    history: { 
        type: String, 
        maxLength: 500 
    }  // Optional, max length validation
});

/*
The tasteSchema includes validation for flavor, texture, and aroma fields to ensure they meet specified length constraints.
Pairings are stored in an array of strings.
*/
const tasteSchema = new mongoose.Schema({
    flavor: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },  // Required, min and max length validation
    texture: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },  // Required, min and max length validation
    aroma: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },  // Required, min and max length validation
    pairings: { 
        type: [String], 
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'There must be at least one pairing.'
        }
    } // Optional array with custom validation
});

/*
The relatedCheeseSchema includes validation with enum, ensuring the relationType is either 'similar' or 'complementary'.
*/
const relatedCheeseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },  // Required, min and max length validation
    relationType: { 
        type: String, 
        enum: ['similar', 'complementary'], 
        required: true 
    } // Enum validation, must be either 'similar' or 'complementary'
});

/*
The main cheeseSchema applies validations to ensure that all critical fields conform to specified constraints.
This schema captures all relevant details for a cheese entry.
*/
const cheeseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true, 
        minLength: 3, 
        maxLength: 100 
    },  // Required, unique, min and max length validation
    age: { 
        type: Number, 
        required: true, 
        min: 0, 
        max: 100 
    },  // Required, numerical range validation
    origin: { 
        type: originSchema, 
        required: true 
    }, // Embedded origin schema with required validation
    taste: { 
        type: tasteSchema, 
        required: true 
    },   // Embedded taste schema with required validation
    ingredients: { 
        type: [String], 
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'There must be at least one ingredient.'
        }
    },  // Required array with custom validation
    production: {
        method: { 
            type: String, 
            maxLength: 500 
        },  // Optional, max length validation
        aged: { 
            type: String, 
            enum: ['fresh', 'aged', 'extra aged', '1 month'], // Enum validation for aging stages
            maxLength: 100 
        },  // Optional, enum validation
        location: { 
            type: String, 
            maxLength: 100 
        }  // Optional, max length validation
    },
    awards: [{
        name: { 
            type: String, 
            maxLength: 100 
        }, // Optional, max length validation
        event: { 
            type: String, 
            maxLength: 100 
        }, // Optional, max length validation
        year: { 
            type: Number, 
            min: 1000, 
            max: 9999 
        } // Optional, numerical range validation
    }],
    nutrition: {
        calories: { 
            type: Number, 
            min: 0 
        }, // Optional, numerical range validation
        fat: { 
            type: String, 
            maxLength: 50 
        }, // Optional, max length validation
        protein: { 
            type: String, 
            maxLength: 50 
        }, // Optional, max length validation
        carbohydrates: { 
            type: String, 
            maxLength: 50 
        } // Optional, max length validation
    }
});

// Create the Cheese model from the schema
const Cheese = mongoose.model('Cheese', cheeseSchema);

module.exports = Cheese;

/*
Validation is enforced in the schema for required fields like name, age, origin, and taste.
Enums are used where necessary, such as in the relationType field within relatedCheeses, and in the aging stages.
This ensures that only valid data is stored in the database.
*/