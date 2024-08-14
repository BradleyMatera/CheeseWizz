// This file contains the schema for the authors collection in the database.
// The schema defines the structure of the documents in the collection.
// The schema is then exported so that it can be used in the controller file.
// The schema is used to create a model for the collection in the database.
// The model is then used to perform CRUD operations on the collection.
// The model is used in the controller file to perform the CRUD operations.
const mongoose = require('mongoose');

const authorsSchema = mongoose.Schema({
    name: String,
    age: Number,

});

module.exports = mongoose.model('Authors', authorsSchema);