const mongoose = require('mongoose');

const originSchema = new mongoose.Schema({
    country: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },
    region: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100 
    },
    village: { 
        type: String, 
        maxLength: 100 
    },
    history: { 
        type: String, 
        maxLength: 500 
    },
    cheeses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cheese'
    }]
});

const Origin = mongoose.model('Origin', originSchema);

module.exports = Origin;