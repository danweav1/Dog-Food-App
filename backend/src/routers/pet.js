const express = require('express');
const auth = require('../middleware/auth');
//const upload = require('../middleware/upload');
const router = new express.Router();
const PetController = require('../controllers/pet');
const AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');

AWS.config.update({
  signatureVersion: process.env.SIGNATURE_VERSION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();

var upload = multer({
  storage: multerS3({
    s3,
    bucket: 'dog-food-images',
    key: function (req, file, cb) {
      let newFileName = Date.now() + '-' + file.originalname;
      var fullPath = 'pets/' + newFileName;
      cb(null, fullPath);
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
