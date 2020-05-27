const Pet = require('../models/pet');
const AWS = require('aws-sdk');

AWS.config.update({
  signatureVersion: 'v4',
  accessKeyId: 'AKIAI4EQI22HQCZ32APQ',
  secretAccessKey: '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',
  region: 'us-east-2',
});

const s3 = new AWS.S3();

exports.createPet = async (req, res) => {
  const pet = new Pet({
    ...req.body,
    owner: req.user._id,
  });

  if (req.file) {
    pet.key = req.file.key;
  }

  console.log(pet);
  try {
    await pet.save();
    res.status(201).send({ message: 'Pet added: ' + pet.name, pet });
  } catch (error) {
    res.status(500).send({
      message: 'Creating a pet failed!',
    });
  }
};

exports.getPets = async (req, res) => {
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

    req.user.pets.forEach((pet) => {
      if (pet.key) {
        const imageData = {
          Bucket: 'dog-food-images',
          Key: pet.key,
        };
        const signedUrl = s3.getSignedUrl('getObject', imageData);
        pet.imagePath = signedUrl;
      }
    });

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
};

exports.getPet = async (req, res) => {
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
};

exports.updatePet = async (req, res) => {
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
};

exports.deletePet = async (req, res) => {
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
};
