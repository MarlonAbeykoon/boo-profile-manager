jest.mock('../../models/Profile', () => {
    return {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn()
    };
});

const Profile = require('../../models/Profile');
const profileRepository = require('../../repositories/profileRepository');

describe('ProfileRepository with Mocks', () => {

    beforeEach(() => {
        Profile.find.mockClear();
        Profile.findById.mockClear();
        Profile.create.mockClear();
    });

    describe('findAll', () => {
        it('should return all profiles', async () => {
            const mockProfiles = [
                { name: 'John Doe', description: 'Test profile 1' },
                { name: 'Jane Doe', description: 'Test profile 2' },
            ];
            Profile.find.mockResolvedValue(mockProfiles);

            const profiles = await profileRepository.findAll();
            expect(profiles).toEqual(mockProfiles);
            expect(Profile.find).toHaveBeenCalled();
        });
    });

    describe('findById', () => {
        it('should return a profile by ID', async () => {
            const mockProfile = { _id: 'someId', name: 'John Doe', description: 'Test profile' };
            Profile.findById.mockResolvedValue(mockProfile);

            const profile = await profileRepository.findById('someId');
            expect(profile).toEqual(mockProfile);
            expect(Profile.findById).toHaveBeenCalledWith('someId');
        });

        it('should throw an error if profile not found', async () => {
            Profile.findById.mockResolvedValue(null);

            await expect(profileRepository.findById('nonExistingId')).rejects.toThrow('Profile not found');
        });
    });
});
