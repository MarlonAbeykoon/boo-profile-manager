const { postComment, getCommentsByFilters, addLike, minusLike } = require('../../controllers/CommentController'); // Update the path as necessary
const commentRepository = require('../../repositories/commentRepository');
const voteRepository = require('../../repositories/voteRepository');

jest.mock('../../repositories/commentRepository');
jest.mock('../../repositories/voteRepository');

describe('Comment and Vote Operations', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('postComment', () => {
        it('should create a comment and a vote successfully', async () => {
            const req = {
                params: { profileId: 'profile123' },
                body: {
                    commentData: { text: 'Nice!' },
                    voteData: { upvote: true },
                    user: 'user123'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            voteRepository.createVote.mockResolvedValue({ _id: 'vote123' });
            commentRepository.createComment.mockResolvedValue({ text: 'Nice!', user: 'user123', vote: 'vote123' });

            await postComment(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                user: 'user123'
            }));
        });

    });

    describe('getCommentsByFilters', () => {
        it('should return comments based on filters', async () => {
            const req = {
                params: { profileId: 'profile123' },
                query: { mbti: 'INTJ', enneagram: '5w6', zodiac: 'Aquarius', sort: 'recent' }
            };
            const res = {
                json: jest.fn()
            };
            const next = jest.fn();

            commentRepository.getCommentsByProfileIdAndPersonalitySystems.mockResolvedValue([{ comment: 'Test comment' }]);

            await getCommentsByFilters(req, res, next);

            expect(res.json).toHaveBeenCalledWith([{ comment: 'Test comment' }]);
        });
    });

    describe('addLike', () => {
        it('should increment like count of a comment', async () => {
            const req = { params: { commentId: 'comment123' } };
            const res = { json: jest.fn() };
            const next = jest.fn();

            commentRepository.likeComment.mockResolvedValue({ _id: 'comment123', likes: 1 });

            await addLike(req, res, next);

            expect(res.json).toHaveBeenCalledWith({ _id: 'comment123', likes: 1 });
        });

    });

    describe('minusLike', () => {
        it('should decrement like count of a comment', async () => {
            const req = { params: { commentId: 'comment123' } };
            const res = { json: jest.fn() };
            const next = jest.fn();

            commentRepository.unlikeComment.mockResolvedValue({ _id: 'comment123', likes: 0 });

            await minusLike(req, res, next);

            expect(res.json).toHaveBeenCalledWith({ _id: 'comment123', likes: 0 });
        });

    });

});
