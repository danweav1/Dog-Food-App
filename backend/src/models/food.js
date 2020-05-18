const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  flavor: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  imagePath: {
    type: String,
    required: true,
    trim: true,
  },
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
