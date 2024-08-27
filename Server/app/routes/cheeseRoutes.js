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
  getCheeseOriginById,
  createOrigin,
  updateOriginById,
  deleteOriginById
} = require("../controller/originCtrl");

const {
  getAllCheeseTastes,
  getCheeseTasteById,
  createTaste,
  updateTasteById,
  deleteTasteById
} = require("../controller/tasteCtrl");

const {
  getAllRelatedCheeses,
  getRelatedCheeseById,
  createRelatedCheese,
  updateRelatedCheeseById,
  deleteRelatedCheeseById
} = require("../controller/relatedCtrl");

// Cheese routes
router.get('/cheeses', getAllCheeseTypes);
router.post('/cheeses', createCheese);
router.get('/cheeses/:id', getCheeseTypeById);
router.put('/cheeses/:id', updateCheeseById);
router.delete('/cheeses/:id', deleteCheeseByID);

// Origin routes
router.get('/origins', getAllCheeseOrigins);
router.post('/origins', createOrigin);
router.get('/origins/:id', getCheeseOriginById);
router.put('/origins/:id', updateOriginById);
router.delete('/origins/:id', deleteOriginById);

// Taste routes
router.get('/tastes', getAllCheeseTastes);
router.post('/tastes', createTaste);
router.get('/tastes/:id', getCheeseTasteById);
router.put('/tastes/:id', updateTasteById);
router.delete('/tastes/:id', deleteTasteById);

// Related Cheese routes
router.get('/relatedCheeses', getAllRelatedCheeses);
router.post('/relatedCheeses', createRelatedCheese);
router.get('/relatedCheeses/:id', getRelatedCheeseById);
router.put('/relatedCheeses/:id', updateRelatedCheeseById);
router.delete('/relatedCheeses/:id', deleteRelatedCheeseById);

module.exports = router;