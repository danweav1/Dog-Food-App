const mongoose = require('mongoose');

const Food = mongoose.model('Food', {
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

module.exports = Food;
