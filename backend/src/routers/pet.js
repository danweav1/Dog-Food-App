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
    res.status(201).send({ message: 'Pet added: ' + pet.name, pet });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get your pets
router.get('/pets', auth, async (req, res) => {
  try {
    await req.user.populate('pets').execPopulate();
    console.log(req.user.pets);
    res.send({
      message: 'Got pets!',
      pets: req.user.pets,
    });
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

router.patch('/pets/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body); // takes the object and returns the keys of the object as an array of strings
  const allowedUpdates = ['name', 'badIngredients', 'favoriteFoods', 'avatarPath'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)); // for every update in updates, return true or false

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const pet = await Pet.findOne({ _id: req.params.id, owner: req.user._id });
    if (!pet) {
      return res.status(404).send(); // no pet found with given id
    }
    updates.forEach((update) => (pet[update] = req.body[update]));
    await pet.save();
    res.send(pet);
  } catch (error) {
    // could be validation or server/database issue
    res.status(400).send(error);
  }
});

router.delete('/pets/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!pet) {
      res.status(404).send(error);
    }

    res.status(200).send({ message: 'Pet deleted!', pet });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
