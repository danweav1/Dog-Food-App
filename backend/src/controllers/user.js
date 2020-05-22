const User = require('../models/user');

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user }); //, token });
  } catch (error) {
    res.status(500).send({
      message: 'Invalid authentication credentials!',
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    console.log(user, token);
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(401).send({
      message: 'Invalid authentication credentials!',
    });
  }
};

exports.userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

exports.userLogoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

exports.getProfile = async (req, res) => {
  res.send(req.user);
};

exports.userUpdate = async (req, res) => {
  const updates = Object.keys(req.body); // takes the object and returns the keys of the object as an array of strings
  const allowedUpdates = ['email', 'password'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)); // for every update in updates, return true or false

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    // could be validation or server/database issue
    res.status(400).send(error);
  }
};

exports.userDelete = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};
