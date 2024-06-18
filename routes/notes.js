const express = require('express');
const Router = express.Router();
const noteController = require('../controllers/notes');

Router.get('/', noteController.getNotes);
Router.post('/add', noteController.addNote);

module.exports = Router;