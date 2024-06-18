const express = require('express');
const sequelize = require('./utils/db');
const session = require('express-session');

const User = require('./models/user');
User.sync();

const Note = require('./models/note');
Note.sync();

const app = express();

app.use(session({
    secret: "thismysecretkey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRoutes = require('./routes/users');
const notesRoutes = require('./routes/notes.js');

app.use('/users', usersRoutes);
app.use('/notes', notesRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})