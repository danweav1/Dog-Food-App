const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const UserController = require('../controllers/user');

// create a user
router.post('/users/signup', UserController.createUser);

// login
router.post('/users/login', UserController.userLogin);

// logout
router.post('/users/logout', auth, UserController.userLogout);

// logout of all devices
router.post('/users/logoutAll', auth, UserController.userLogoutAll);

// Get current logged in user
router.get('/users/me', auth, UserController.getProfile);

// change your account info
router.patch('/users/me', auth, UserController.userUpdate);

// delete your account
router.delete('/users/me', auth, UserController.userDelete);

module.exports = router;
