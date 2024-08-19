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
    cheeses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cheese'
    }]
});

const RelatedCheese = mongoose.model('RelatedCheese', relatedCheeseSchema);

module.exports = RelatedCheese;