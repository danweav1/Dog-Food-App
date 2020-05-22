const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const PetController = require('../controllers/pet');

// Add a pet
router.post('/pets', auth, PetController.createPet);

// Get your pets
// GET /pets?limit=10&skip=0 will give us only 10 results at a time. 0 means it will give us the first 10 results. 10 means second page.
// I am using the name pagesize instead of limit
router.get('/pets', auth, PetController.getPets);

// Get pet by id
router.get('/pets/:id', auth, PetController.getPet);

router.patch('/pets/:id', auth, PetController.updatePet);

router.delete('/pets/:id', auth, PetController.deletePet);

module.exports = router;
