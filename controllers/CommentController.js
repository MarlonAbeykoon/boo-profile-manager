const commentRepository = require('../repositories/commentRepository');
const voteRepository = require('../repositories/voteRepository');
async function postComment(req, res, next) {
    try {
        const profileId = req.params.profileId;
        const { commentData, voteData, user } = req.body;

        let vote = null;
        if (voteData) {
            vote = await voteRepository.createVote({ ...voteData, profile: profileId });
        }

        const commentPayload = { ...commentData, user, profile: profileId, vote: vote ? vote._id : undefined };

        const comment = await commentRepository.createComment(commentPayload);

        res.status(201).json({ comment, vote, user });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
}

async function getCommentsByFilters(req, res, next) {
    try {
        const { mbti, enneagram, zodiac, sort } = req.query;

        const comments = await commentRepository.getCommentsByProfileIdAndPersonalitySystems({
            profileId: req.params.profileId,
            mbti,
            enneagram,
            zodiac,
            sort
        });

        res.json(comments);
    } catch (error) {
        next(error);
    }
}

async function addLike(req, res, next) {
    try {
        const comment = await commentRepository.likeComment(req.params.commentId);
        res.json(comment);
    } catch (error) {
        next(error);
    }
}

async function minusLike(req, res, next) {
    try {
        const comment = await commentRepository.unlikeComment(req.params.commentId);
        res.json(comment);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    postComment,
    getCommentsByFilters,
    addLike,
    minusLike
};
