const Post = require('../models/post');
const { body, validationResult } = require('express-validator');

exports.create_post = [
    body('title', 'content').trim().escape(),

    async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                data: req.body
            })
        }
        const { author, title, content } = req.body;
        const post = new Post({
            title,
            author,
            content
        });
        try {
            post.save((err) => {
            if(err) return next(err);

            console.log('Post Saved');
            res.status(200).json({ post });
        })
        } catch (err) {
            next(err)
        }
    }
];

exports.get_posts = async function(req, res, next) {
    try {
        const posts = await Post.find({});
        if (!posts) return res.status(404);
        res.status(200).json({ posts });
    } catch (err) {
        next(err)
    }
};

//     title: { type: String, required: true },
//     date: { type: Date, default: Date.now },
//     content: { type: String, required: true },
//     author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
//     comments: { type: Array, default: [] },
//     published: { type: Boolean, default: false },