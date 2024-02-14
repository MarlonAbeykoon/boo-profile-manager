const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    vote: { type: mongoose.Schema.Types.ObjectId, ref: 'Vote' },
    title: String,
    description: String,
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;