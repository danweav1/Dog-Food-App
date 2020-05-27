const AWS = require('aws-sdk');
const Food = require('../models/food');

AWS.config.update({
  signatureVersion: process.env.SIGNATURE_VERSION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();

exports.test = async (req, res) => {
  try {
    const authData = {
      Bucket: 'dog-food-images',
      Key: 'food/wellness-adult-lamb-barley.jpg',
    };
    const test = s3.getSignedUrl('getObject', authData);
    //const base64 = encode(test);
    //console.log('signed url', test);
    //console.log('base64', encode(test));
    const data = await s3.getObject({
      Bucket: 'dog-food-images',
      Key: '/food/wellness-adult-lamb-barley.jpg',
    });
    // console.log('data', data);
    //res.sendFile(test);
  } catch (error) {
    //console.log('error ', error);
    res.status(500).send(error);
  }
};

function encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64;
}

exports.getFood = async (req, res) => {
  const match = {};

  if (req.query.name) {
    match.name = req.query.name;
  }

  if (req.query.brand) {
    match.brand = req.query.brand;
  }

  if (req.query.ingredients) {
    match.ingredients = { $all: req.query.ingredients }; // will look for foods that contain the given ingredients
  } else if (req.query.noingredients) {
    match.ingredients = { $ne: req.query.noingredients };
  }

  try {
    pageSize = parseInt(req.query.pagesize);
    page = parseInt(req.query.page);
    const foods = await Food.find(match)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const totalCount = await Food.count();
    res.send({
      message: 'Got food!',
      foods,
      maxFoods: totalCount,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving food!',
    });
  }
};
