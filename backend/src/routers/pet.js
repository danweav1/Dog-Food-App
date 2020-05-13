const express = require('express');
const Pet = require('../models/pet');
const auth = require('../middleware/auth');
const router = new express.Router();

// Add a pet
router.post('/pets', async (req, res) => {
  const pet = new Pet({
    ...req.body,
  });
  // console.log('hey look at pet', pet, req.body);
  // res.status(201).send({ message: 'Pet added successfully!' });
  // const pet = new Pet({
  //   ...req.body,
  //   owner: req.user._id,
  // });
  console.log(pet);
  console.log(req.body);
  try {
    await pet.save();
    res.status(201).send(pet);
    console.log(pet);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

// Get your pets
router.get('/pets', async (req, res) => {
  const pets = [
    { id: 'ablks123123', name: 'Brooklyn', owner: 'Dan' },
    { id: 'a23443', name: 'Brooklyn1', owner: 'Dan' },
    { id: 'abaweee', name: 'Brooklyn2', owner: 'Dan' },
    { id: 'abaweee', name: 'Brooklyn3', owner: 'Dan' },
  ];
  res.status(202).send({
    message: 'Pets fetched succesfully!',
    pets,
  });
  // try {
  //   await req.user.populate('pets').execPopulate();
  //   res.send(req.user.pets);
  // } catch (error) {
  //   res.status(400).send(error);
  // }
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
