const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    badIngredients: [
      [
        {
          Ingredient: {
            type: String,
          },
        },
      ],
    ],
    favoriteFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // reference to the User model
    },
    avatarPath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
