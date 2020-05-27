// const AWS = require('aws-sdk');
// const Food = require('../models/food');
// const multer = require('multer');
// const multerS3 = require('multer-S3');

// AWS.config.update({
//   signatureVersion: 'v4',
//   accessKeyId: 'AKIAI4EQI22HQCZ32APQ',
//   secretAccessKey: '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',
//   region: 'us-east-2',
// });

// const s3 = new AWS.S3();

// const uploader = async (req, res, next) => {
//   const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'dog-food-images',
//       key: function (req, file, cb) {
//         let newFileName = Date.now() + '-' + req.body.name;
//         var fullPath = 'pets/' + newFileName;
//         console.log(file);
//         console.log('path', file);
//         cb(null, file.originalname); //use Date.now() for unique file keys
//       },
//     }),
//   });
// };

// module.exports = uploader;

// const multer = require('multer');

// const MIME_TYPE_MAP = {
//   'image/png': 'png',
//   'image/jpeg': 'jpg',
//   'image/jpg': 'jpg',
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error('Invalid mime type');
//     if (isValid) {
//       error = null;
//     }
//     cb(error, 'images');
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname.toLowerCase().split(' ').join('-');
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + '-' + Date.now() + '.' + ext);
//   },
// });

// module.exports = multer({ storage: storage }).single('image');
