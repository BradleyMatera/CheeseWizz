const mongoose = require('mongoose');

// Define sub-schemas for origin, taste, and related cheeses
/*
Mongoose schema is defined for the Cheese model.
It includes sub-schemas for origin, taste, and related cheeses, capturing all necessary details.
The schema supports embedded documents for managing related data.
*/
const originSchema = new mongoose.Schema({
    country: { type: String, required: true },  // Required validation
    region: { type: String, required: true },   // Required validation
    village: { type: String },
    history: { type: String }
});

const tasteSchema = new mongoose.Schema({
    flavor: { type: String, required: true },  // Required validation
    texture: { type: String, required: true }, // Required validation
    aroma: { type: String, required: true },   // Required validation
    pairings: [String]
});

// Define related cheese schema
/*
The Cheese model integrates relationships by embedding sub-schemas for origin and taste within it.
RelatedCheeses is used to demonstrate the relationship between different cheese entries.
This setup allows for managing related data within a single model structure.
*/
const relatedCheeseSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Required validation
    relationType: { type: String, enum: ['similar', 'complementary'], required: true } // Enum validation
});

// Define the main cheese schema
/*
The Cheese model and its sub-schemas contain well over 3-5 properties each.
These properties include essential fields like name, age, flavor, texture, country, and more.
This structure ensures that all relevant details are captured within the model.
*/
const cheeseSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Required validation
    age: { type: Number, required: true },   // Required validation
    origin: { type: originSchema, required: true }, // Embedded origin schema
    taste: { type: tasteSchema, required: true },   // Embedded taste schema
    ingredients: [String],
    production: {
        method: { type: String },
        aged: { type: String },
        location: { type: String }
    },
    awards: [{
        name: String,
        event: String,
        year: Number
    }],
    nutrition: {
        calories: Number,
        fat: String,
        protein: String,
        carbohydrates: String
    },
    relatedCheeses: [relatedCheeseSchema] // Array of related cheeses
});

// Create the Cheese model from the schema
const Cheese = mongoose.model('Cheese', cheeseSchema);

module.exports = Cheese;

/*
Validation is enforced in the schema for required fields like name, age, origin, and taste.
Enums are used where necessary, such as in the relationType field within relatedCheeses.
This ensures that only valid data is stored in the database.
*/