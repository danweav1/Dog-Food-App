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

  if (req.query.flavor) {
    match.flavor = req.query.flavor;
  }

  if (req.query.ingredients) {
    match.ingredients = { $all: req.query.ingredients };
  }

  console.log(req.query.ingredients);
  console.log(match.ingredients);
  try {
    const allFood = await Food.find(match);
    console.log(allFood);
    res.send({
      allFood,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
