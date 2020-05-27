const express = require('express');
const auth = require('../middleware/auth');
//const upload = require('../middleware/upload');
const router = new express.Router();
const PetController = require('../controllers/pet');
const AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');

AWS.config.update({
  signatureVersion: 'v4',
  accessKeyId: 'AKIAI4EQI22HQCZ32APQ',
  secretAccessKey: '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',
  region: 'us-east-2',
});

const s3 = new AWS.S3();

var upload = multer({
  storage: multerS3({
    s3,
    bucket: 'dog-food-images',
    key: function (req, file, cb) {
      let newFileName = Date.now() + '-' + file.originalname;
      var fullPath = 'pets/' + newFileName;
      //console.log(file);
      //console.log('path', fullPath);
      cb(null, fullPath); //file.originalname); //use Date.now() for unique file keys
    },
  }),
});

// Add a pet
router.post('/pets', auth, upload.single('image'), PetController.createPet);

// Get your pets
// GET /pets?limit=10&skip=0 will give us only 10 results at a time. 0 means it will give us the first 10 results. 10 means second page.
// I am using the name pagesize instead of limit
router.get('/pets', auth, PetController.getPets);

// Get pet by id
router.get('/pets/:id', auth, PetController.getPet);

router.patch('/pets/:id', auth, PetController.updatePet);

router.delete('/pets/:id', auth, PetController.deletePet);

module.exports = router;
