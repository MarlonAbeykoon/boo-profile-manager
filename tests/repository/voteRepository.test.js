const mongoose = require('mongoose');
const { createVote } = require('../../repositories/voteRepository');
const Vote = require('../../models/Vote');

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('../../models/Vote', () => {
    return jest.fn().mockImplementation((voteData) => {
        return {
            ...voteData,
            save: jest.fn().mockImplementation(function () {
                return Promise.resolve(this);
            })
        };
    });
});

describe('createVote', () => {
    it('should save a vote successfully and return the vote with its mbti property', async () => {
        const voteData = {
            profile: new mongoose.Types.ObjectId(),
            mbti: 'INTJ',
            enneagram: '5w6',
            zodiac: 'Aquarius',
        };

        const savedVote = await createVote(voteData);

        expect(savedVote.mbti).toEqual('INTJ');
        expect(savedVote.save).toHaveBeenCalled();
    });

    it('should handle save errors gracefully', async () => {
        const mockSave = jest.fn().mockRejectedValue(new Error('Failed to save'));
        Vote.mockImplementation(() => ({ save: mockSave }));

        const voteData = {
            profile: new mongoose.Types.ObjectId(),
            mbti: 'INTJ',
            enneagram: '5w6',
            zodiac: 'Aquarius',
        };

        await expect(createVote(voteData)).rejects.toThrow('Failed to save');

        expect(mockSave).toHaveBeenCalledTimes(1);
    });
});
