const mongoose = require('mongoose');

// Define the origin schema
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
    }
});

module.exports = mongoose.model('Origin', originSchema); // Exporting as a Mongoose model