const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const FoodController = require('../controllers/food');

// Get all the foods
// GET /tasks?brand=
router.get('/food', auth, FoodController.getFood);

router.get('/foodimagetest', auth, FoodController.test);

module.exports = router;
