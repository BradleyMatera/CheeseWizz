// Importing all the cheese functions from their respective files
const addCheese = require('./addCheese');
const subtractCheese = require('./subtractCheese');
const multiplyCheese = require('./multiplyCheese');
const divideCheese = require('./divideCheese');
const cheeseSqrt = require('./cheeseSqrt');
const maxCheese = require('./maxCheese');

// Exporting all functions together as a "single module"
module.exports = {
  addCheese,
  subtractCheese,
  multiplyCheese,
  divideCheese,
  cheeseSqrt,
  maxCheese,
};