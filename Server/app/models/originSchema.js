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
    }],
    relatedCheeses: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RelatedCheese' 
    }],
    tastes: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Taste' 
    }]
});

module.exports = mongoose.model('Origin', originSchema);