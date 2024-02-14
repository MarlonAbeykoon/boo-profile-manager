const mongoose = require("mongoose");
const { getCommentsByProfile, getCommentsByProfileIdAndPersonalitySystems, createComment, likeComment, unlikeComment } = require('../../repositories/commentRepository');
const Comment = require('../../models/Comment');

mongoose.Types.ObjectId = jest.fn();

jest.mock('../../models/Comment', () => ({

    find: jest.fn(() => ({
        sort: jest.fn().mockReturnThis(),
    })),
    aggregate: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    save: jest.fn()
}));

describe('Comment Operations', () => {
    beforeEach(() => {
        Comment.find.mockClear();
        Comment.aggregate.mockClear();
        Comment.findByIdAndUpdate.mockClear();
    });

    describe('getCommentsByProfile', () => {
        it('should call find with the correct profileId and sort', async () => {
            const profileId = 'testProfileId';

            Comment.find.mockReturnValue({
                sort: jest.fn().mockReturnThis(),
            });

            await getCommentsByProfile(profileId);

            expect(Comment.find).toHaveBeenCalledWith({ profile: profileId });
            expect(Comment.find().sort).toHaveBeenCalledWith({ createdAt: -1 });
        });
    });


    describe('getCommentsByProfileIdAndPersonalitySystems', () => {
        it('should call aggregate with correct pipeline for filters', async () => {
            const args = {
                profileId: 'testProfileId',
                mbti: 'INTJ',
                enneagram: '5w4',
                zodiac: 'Aquarius',
                sort: 'recent'
            };

            const expectedPipeline = [
                {
                    "$lookup": {
                        "from": "votes",
                        "localField": "vote",
                        "foreignField": "_id",
                        "as": "voteInfo"
                    }
                },
                {
                    "$unwind": "$voteInfo"
                },
                {
                    "$match": {
                        "voteInfo.enneagram": "5w4",
                        "voteInfo.mbti": "INTJ",
                        "voteInfo.zodiac": "Aquarius"
                    }
                },
                {
                    "$sort": {
                        "createdAt": -1
                    }
                }
            ];

            await getCommentsByProfileIdAndPersonalitySystems(args);

            const actualPipeline = Comment.aggregate.mock.calls[0][0];

            expect(actualPipeline).toEqual(expectedPipeline);
        });
    });

    describe('likeComment', () => {
        it('should increment likes by 1', async () => {
            const commentId = 'commentId';
            await likeComment(commentId);
            expect(Comment.findByIdAndUpdate).toHaveBeenCalledWith(commentId, { $inc: { likes: 1 } }, { new: true });
        });
    });

    describe('unlikeComment', () => {
        it('should decrement likes by 1', async () => {
            const commentId = 'commentId';
            await unlikeComment(commentId);
            expect(Comment.findByIdAndUpdate).toHaveBeenCalledWith(commentId, { $inc: { likes: -1 } }, { new: true });
        });
    });
});
