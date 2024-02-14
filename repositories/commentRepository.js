const Comment = require('../models/Comment');
const {Types} = require("mongoose");

async function getCommentsByProfile(profileId) {
    return Comment.find({ profile: profileId }).sort({ createdAt: -1 });
}

async function getCommentsByProfileIdAndPersonalitySystems({ profileId, mbti, enneagram, zodiac, sort = 'recent' }) {
    const matchCondition = {};

    if (profileId) matchCondition['profile'] = Types.ObjectId(profileId);

    if (mbti || enneagram || zodiac) {
        // If any of the filters are provided, include them in the match condition.
        if (mbti) matchCondition['voteInfo.mbti'] = mbti;
        if (enneagram) matchCondition['voteInfo.enneagram'] = enneagram;
        if (zodiac) matchCondition['voteInfo.zodiac'] = zodiac;
    }

    const aggregationPipeline = [
        {
            $lookup: {
                from: 'votes',
                localField: 'vote',
                foreignField: '_id',
                as: 'voteInfo'
            }
        },
        {
            $unwind: '$voteInfo'
        }
    ];

    // Only add the match stage if there are conditions to match.
    if (Object.keys(matchCondition).length > 0) {
        aggregationPipeline.push({ $match: matchCondition });
    }

    // Determine the sort order based on the 'sort' parameter.
    const sortOrder = sort === 'best' ? { 'likes': -1 } : { 'createdAt': -1 };

    aggregationPipeline.push({ $sort: sortOrder });

    return Comment.aggregate(aggregationPipeline);
}


async function createComment(commentData) {
    const comment = new Comment(commentData);
    await comment.save();
    return comment;
}

async function likeComment(commentId) {
    return Comment.findByIdAndUpdate(commentId, { $inc: { likes: 1 } }, { new: true });
}

async function unlikeComment(commentId) {
    return Comment.findByIdAndUpdate(commentId, { $inc: { likes: -1 } }, { new: true });
}


module.exports = {
    getCommentsByProfile,
    getCommentsByProfileIdAndPersonalitySystems,
    createComment,
    likeComment,
    unlikeComment
};