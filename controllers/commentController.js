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

exports.get_comments = async function(req, res, next) {
    try {
        const allComments = await Comment.find({});
        const comments = allComments.filter(
            (comment) => comment.postId === req.params.postid
        )
        if (!comments) return res.status(404).json({ err: `Comments not found` });
        res.status(200).json({ comments });
    } catch (err) {
        next(err)
    }
};

exports.get_single_comment = async function(req, res, next) {
    try {
        const comment = await Comment.findById(req.params.commentid);
        if (!comment) return res.status(404).json({ err: `Comment with id ${req.params.commentid} not found` });
        res.status(200).json({ comment });
    } catch (err) {
        next(err)
    }
};

exports.delete_comment = async function(req, res, next) {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentid)
        if (!comment) return res.status(404).json({ msg: `Comment with id ${req.params.commentid} not found` })
        res.status(202).json({ msg: `Comment deleted successfully` })
    } catch (err) {
        next(err);
    }
}