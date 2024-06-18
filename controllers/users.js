const bcrypt = require('bcrypt');
const User = require('../models/user');

const register = (req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, (err, cryptPassword) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: cryptPassword
        })
        .then(registered => {
            req.session.user = {
                username: registered.username,
                user_id: registered.id
            };
            console.log(req.session)
            res.json({
                message: 'User registered successfully',
                user: registered,
                session: req.session.user
            });
        })
    })
}

module.exports = {
    register
}       