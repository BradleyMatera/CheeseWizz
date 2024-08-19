// Define the related cheese schema
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
    }
});

module.exports = relatedCheeseSchema;