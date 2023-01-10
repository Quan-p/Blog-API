const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    date: { type: Date, default: Date.now() },
    text: { type: String, required: true },
    user: { type: String, required: true },
    postId: { type: String, required: true }
})

module.exports = mongoose.model('Comment', CommentSchema);
