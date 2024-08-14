const mongoose = require('mongoose');

// Define sub-schemas for origin, taste, and related cheeses
const originSchema = new mongoose.Schema({
    country: { type: String, required: true },
    region: { type: String, required: true },
    village: { type: String },
    history: { type: String }
});

const tasteSchema = new mongoose.Schema({
    flavor: { type: String, required: true },
    texture: { type: String, required: true },
    aroma: { type: String, required: true },
    pairings: [String]
});

const relatedCheeseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    relationType: { type: String, enum: ['similar', 'complementary'], required: true }
});

const cheeseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    origin: { type: originSchema, required: true },
    taste: { type: tasteSchema, required: true },
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

const Cheese = mongoose.model('Cheese', cheeseSchema);

module.exports = Cheese;