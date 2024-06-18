const express = require('express');
const Router = express.Router();
const userController = require('../controllers/users');

Router.post('/register', userController.register);

module.exports = Router;