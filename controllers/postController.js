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
            content,
            published
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

exports.get_single_post = async function(req, res, next) {
    try {
        const post = await Post.findById(req.params.postid);
        if (!post) return res.status(404).json({ err: `Post with id ${req.params.id} not found` });
        res.status(200).json({ post });
    } catch (err) {
        next(err)
    }
};

exports.update_post = async function(req, res, next) {
    try {
        const { title, content, author } = req.body;
        const post = await Post.findByIdAndUpdate(req.params.postid, {
            title,
            content,
            author,
        });
        if (!post) return res.status(404).json({ err: `Post with id ${req.params.id} not found` });
        res.status(200).json({ msg: "Post updated successfully" });
    } catch (err) {
        next(err);
    }
}

exports.delete_post = async function(req, res, next) {
    try {
        const post = await Post.findByIdAndDelete(req.params.postid);
        if (!post) return res.status(404).json({ msg: `Post with id ${req.params.id} not found` })
        res.status(202).json({ msg: `Post deleted successfully` })
    } catch (err) {
        next(err);
    }
}
