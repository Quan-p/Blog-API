const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    comments: { type: Array, default: [] },
    published: { type: Boolean, default: false },
});

module.exports = mongoose.model('Post', PostSchema);
