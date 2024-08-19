const express = require('express');
const router = express.Router();
const {
    getAllCheeseTypes,
    getCheeseTypeById,
    createCheese,
    updateCheeseById,
    deleteCheeseByID
} = require("../controller/bigCtrl");
const {
    getAllCheeseOrigins,
    getCheeseOriginById
} = require("../controller/originCtrl");
const {
    getAllCheeseTastes,
    getCheeseTasteById
} = require("../controller/tasteCtrl");
const { getAllRelatedCheeses, 
        getRelatedCheeseById
 } = require("../controller/relatedCtrl");
// Cheese routes
router.get('/cheeses', getAllCheeseTypes);        // GET all cheese types
router.get('/cheeses/:id', getCheeseTypeById);    // GET cheese by ID
router.post('/cheeses', createCheese);            // POST create new cheese
router.put('/cheeses/:id', updateCheeseById);     // PUT update cheese by ID
router.delete('/cheeses/:id', deleteCheeseByID);  // DELETE cheese by ID
// Origin routes
router.get('/origins', getAllCheeseOrigins);      // GET all origins
router.get('/origins/:id', getCheeseOriginById);  // GET origin by ID
// Taste routes
router.get('/tastes', getAllCheeseTastes);        // GET all tastes
router.get('/tastes/:id', getCheeseTasteById);  
// GET taste by ID
router.get('/relatedCheeses', getAllRelatedCheeses); // GET all related cheeses
router.get('/relatedCheeses/:id', getRelatedCheeseById); // GET related cheese by ID
module.exports = router;