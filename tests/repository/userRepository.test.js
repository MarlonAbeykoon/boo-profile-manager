const mongoose = require('mongoose');
const { createUser } = require('../../repositories/userRepository');
const User = require('../../models/User');

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('../../models/User', () => {
    return jest.fn().mockImplementation((userData) => {
        return {
            ...userData,
            save: jest.fn().mockImplementation(function () {
                return Promise.resolve(this);
            })
        };
    });
});

describe('createUser', () => {
    it('should save a user successfully and return the user', async () => {
        const userData = {
            name: 'John Doe',
        };

        const savedUser = await createUser(userData);

        expect(savedUser.name).toEqual('John Doe');
        expect(savedUser.save).toHaveBeenCalled();
    });

    it('should handle save errors gracefully', async () => {
        const mockSave = jest.fn().mockRejectedValue(new Error('Failed to save'));
        User.mockImplementation(() => ({ save: mockSave }));

        const userData = {
            name: 'John Doe',
        };

        await expect(createUser(userData)).rejects.toThrow('Failed to save');

        expect(mockSave).toHaveBeenCalledTimes(1);
    });
});
