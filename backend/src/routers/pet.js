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
    res.status(500).send({
      message: 'Creating a pet failed!',
    });
  }
});

// Get your pets
// GET /pets?limit=10&skip=0 will give us only 10 results at a time. 0 means it will give us the first 10 results. 10 means second page.
// I am using the name pagesize instead of limit
router.get('/pets', auth, async (req, res) => {
  console.log('page size is ' + req.query.pagesize);
  console.log('page number is ' + req.query.pagesize);
  try {
    await req.user
      .populate({
        path: 'pets',
        options: {
          limit: req.query.pagesize, //mongoose converts this to a number automatically. You would add a + in front normally to convert it, or a parseint
          skip: req.query.pagesize * (req.query.page - 1), //this too
        },
      })
      .execPopulate();
    const totalcount = await Pet.count();
    console.log('totalcount ' + totalcount);
    console.log('pets', req.user.pets);
    res.send({
      message: 'Got pets!',
      pets: req.user.pets,
      maxPets: totalcount,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Fetching pets failed!',
    });
  }
});

// Get pet by id
router.get('/pets/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const pet = await Pet.findOne({ _id, owner: req.user._id });
    if (!pet) {
      return res.status(404).send({
        message: 'Pet not found!',
      });
    }
    res.send(pet);
  } catch (error) {
    res.status(500).send({
      message: 'Fetching pet failed!',
    });
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
      return res.status(401).send({
        message: 'Not authorized!',
      }); // no pet found with given id
    }
    updates.forEach((update) => (pet[update] = req.body[update]));
    await pet.save();
    res.send(pet);
  } catch (error) {
    // could be validation or server/database issue
    res.status(500).send({
      message: "Couldn't update pet!",
    });
  }
});

router.delete('/pets/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!pet) {
      res.status(404).send({
        message: 'Not authorized!',
      });
    }

    res.status(200).send({ message: 'Pet deleted!', pet });
  } catch (error) {
    res.status(500).send({
      message: 'Deleting pet failed!',
    });
  }
});

module.exports = router;
