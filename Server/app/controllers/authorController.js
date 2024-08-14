const Authors = require('../models/Authors');


const getAllAuthors = async (req, res) => {
    const authors = await Authors.find({});
    res.status(200).json({ 
        data : authors,
        success: true,
        message: `${req.method} - Request made to author endpoint`
    });
};
const getAuthorById = (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        id,
        success: true,
        message: `${req.method} - Request made to author endpoint with id`
    });
};
const updateAuthorById = async (req, res) => {
    const { id } = req.params;
    const author = await Authors.findByIdAndUpdate( id, res.body, { new: true });
    res.status(200).json({
        data: author,
        success: true,
        message: `${req.method} - Request made to author endpoint with id`
    });
};
const createAuthors = async (req, res) => {
    const  { author } = req.body;
    const newAuthor  = await Authors.create(author);
    console.log("data >>>", newAuthor);
  
    res.status(201).json({
        success: true,
        message: `${req.method} - Request made to author endpoint`
    });
};
const deleteAuthorByID = (req, res) => { 
    const { id } = req.params;
    res.status(200).json({
        id,
        success: true,
        message: `${req.method} - Request made to author endpoint with id`
    });
}
module.exports = {
    getAllAuthors,
    getAuthorById,
    updateAuthorById,
    createAuthors,
    deleteAuthorByID
};