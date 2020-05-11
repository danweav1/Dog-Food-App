const express = require('express');
const Pet = require('../models/pet');
const auth = require('../middleware/auth');
const router = new express.Router();

// Add a pet
router.post('/pets', auth, async (req, res) => {
  const pet = new Pet({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await pet.save();
    res.status(201).send(pet);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get your pets
router.get('/pets', auth, async (req, res) => {
  try {
    await req.user.populate('pets').execPopulate();
    res.send(req.user.pets);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get pet by id
router.get('/pets/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const pet = await Pet.findOne({ _id, owner: req.user._id });
    if (!pet) {
      return res.status(404).send();
    }
    res.send(pet);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
