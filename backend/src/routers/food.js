const express = require('express');
const Food = require('../models/food');
const auth = require('../middleware/auth');
const router = new express.Router();

// Get all the foods
// GET /tasks?brand=
router.get('/food', auth, async (req, res) => {
  const match = {};

  if (req.query.name) {
    match.name = req.query.name;
  }

  if (req.query.brand) {
    match.brand = req.query.brand;
  }

  if (req.query.ingredients) {
    match.ingredients = { $all: req.query.ingredients }; // will look for foods that contain the given ingredients
  } else if (req.query.noingredients) {
    match.ingredients = { $ne: req.query.noingredients };
  }

  console.log(match);

  try {
    const foods = await Food.find(match);
    res.send({
      foods,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving food!',
    });
  }
});

module.exports = router;
