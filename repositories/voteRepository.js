const Vote = require('../models/Vote');

async function createVote(voteData) {
    const vote = new Vote(voteData);
    await vote.save();
    return vote;
}

module.exports = {
    createVote
};
