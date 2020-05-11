const express = require('express');
const Food = require('../models/food');
const auth = require('../middleware/auth');
const router = new express.Router();

module.exports = router;
