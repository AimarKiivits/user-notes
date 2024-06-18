const Note = require('../models/note');

const getNotes = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: 'You are not logged in'
        });
    }

    Note.findAll({
        where: {
            userId: req.session.user.user_id
        }
    })
    .then(notes => {
        res.json(notes);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong'
        });
    });
}

const addNote = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: 'You are not logged in'
        });
    }

    Note.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.session.user.user_id
    })
    .then(note => {
        res.json({
            message: 'Note added successfully',
            note: note
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong'
        });
    });
}

module.exports = {
    getNotes,
    addNote
};