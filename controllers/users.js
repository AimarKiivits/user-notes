const bcrypt = require('bcrypt');
const User = require('../models/user');

const register = (req, res) => {
    console.log(req.body);

    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }
    if (req.body.password.length < 5) {
        return res.status(400).json({
            message: 'Password must be at least 5 characters long'
        });
    }
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if (user) {
            return res.status(400).json({
                message: 'User with this username already exists'
            });
        }

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
    })
}

module.exports = {
    register
}       