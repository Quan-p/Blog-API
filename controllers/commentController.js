const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

exports.create_comment = [
    body('text', 'Empty Text').trim().escape(),
    body('user', 'Empty User').trim().escape(),

    async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                data: req.body
            })
        }
        const { text, user } = req.body;
        const postId = req.params.postid;
        const comment = new Comment({
            text,
            user,
            postId
        });
        try {
            comment.save((err) => {
            if(err) return next(err);

            console.log('Comment Saved');
            res.status(200).json({ comment });
        })
        } catch (err) {
            next(err)
        }
    } 
];

