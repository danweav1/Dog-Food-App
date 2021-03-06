const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }); // finds user with correct id that still has the given token stored
    if (!user) {
      throw new Error();
    }
    // we are adding these two onto the request so they can be used in future requests on other routes
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'You are not authenticated!' });
  }
};

module.exports = auth;
