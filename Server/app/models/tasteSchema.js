const mongoose = require('mongoose');

const tasteSchema = new mongoose.Schema({
    flavor: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },
    texture: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },
    aroma: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },
    cheeses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cheese'
    }]
});

const Taste = mongoose.model('Taste', tasteSchema);

module.exports = Taste;