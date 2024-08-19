const express = require('express');
const router = express.Router();

// Import cheese-related controller functions
const {
    getAllCheeseTypes,
    getCheeseTypeById,
    createCheese,
    updateCheeseById,
    deleteCheeseByID
} = require("../controller/bigCtrl");

// Import origin-related controller functions
const {                             
    getAllCheeseOrigins,
    getCheeseOriginById,
    createOrigin,                   // Ensure to import createOrigin if it's used
    updateOriginById,               // Ensure to import updateOriginById if it's used
    deleteOriginById                // Ensure to import deleteOriginById if it's used
} = require("../controller/originCtrl");

// Import taste-related controller functions
const {
    getAllCheeseTastes,
    getCheeseTasteById,
    createTaste,                    // Ensure to import createTaste if it's used
    updateTasteById,                // Ensure to import updateTasteById if it's used
    deleteTasteById                 // Ensure to import deleteTasteById if it's used
} = require("../controller/tasteCtrl");

// Import related cheese-related controller functions
const {
    getAllRelatedCheeses,
    getRelatedCheeseById,
    createRelatedCheese,            // Ensure to import createRelatedCheese if it's used
    updateRelatedCheeseById,        // Ensure to import updateRelatedCheeseById if it's used
    deleteRelatedCheeseById         // Ensure to import deleteRelatedCheeseById if it's used
} = require("../controller/relatedCtrl");

// Cheese routes
router.get('/cheeses', getAllCheeseTypes);        
router.get('/cheeses/:id', getCheeseTypeById);    
router.post('/cheeses', createCheese);            
router.put('/cheeses/:id', updateCheeseById);     
router.delete('/cheeses/:id', deleteCheeseByID);  

// Origin routes
router.get('/origins', getAllCheeseOrigins);      
router.get('/origins/:id', getCheeseOriginById);  
router.post('/origins', createOrigin);
router.put('/origins/:id', updateOriginById);
router.delete('/origins/:id', deleteOriginById);

//Origin router post
router.post('/origins', async (req, res) => {
    try {
        const origin = new Origin(req.body); // Create a new origin from request body
        await origin.save(); // Save the new origin to the database
        res.status(201).json({
            success: true,
            data: origin,
            message: 'Origin created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});


// Taste routes
router.get('/tastes', getAllCheeseTastes);        
router.get('/tastes/:id', getCheeseTasteById);    
router.post('/tastes', createTaste);
router.put('/tastes/:id', updateTasteById);
router.delete('/tastes/:id', deleteTasteById);

// Related Cheese routes
router.get('/relatedCheeses', getAllRelatedCheeses); 
router.get('/relatedCheeses/:id', getRelatedCheeseById); 
router.post('/relatedCheeses', createRelatedCheese);
router.put('/relatedCheeses/:id', updateRelatedCheeseById);
router.delete('/relatedCheeses/:id', deleteRelatedCheeseById);

module.exports = router;