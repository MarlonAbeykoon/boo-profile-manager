const { getAllProfiles, getProfileById, createProfile } = require('../../controllers/profileController');
const profileRepository = require('../../repositories/profileRepository');

jest.mock('../../repositories/profileRepository');

describe('Profile Operations', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllProfiles', () => {
        it('should return all profiles', async () => {
            const req = {};
            const res = { json: jest.fn() };
            const next = jest.fn();

            profileRepository.findAll.mockResolvedValue([{ name: 'John Doe' }, { name: 'Jane Doe' }]);

            await getAllProfiles(req, res, next);

            expect(res.json).toHaveBeenCalledWith([{ name: 'John Doe' }, { name: 'Jane Doe' }]);
        });

        it('should handle errors', async () => {
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            profileRepository.findAll.mockRejectedValue(new Error('Internal server error'));

            await getAllProfiles(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
        });
    });

    describe('getProfileById', () => {
        it('should return a profile by ID', async () => {
            const req = { params: { id: '123' } };
            const res = { render: jest.fn() };
            const next = jest.fn();

            profileRepository.findById.mockResolvedValue({ name: 'John Doe', id: '123' });

            await getProfileById(req, res, next);

            expect(res.render).toHaveBeenCalledWith('profile_template', { profile: { name: 'John Doe', id: '123' } });
        });
    });

    describe('createProfile', () => {
        it('should create a profile successfully', async () => {
            const req = { body: { name: 'New Profile', otherDetails: 'Details' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();

            profileRepository.create.mockResolvedValue({ name: 'New Profile', otherDetails: 'Details' });

            await createProfile(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith('Profile created successfully');
        });
    });

});
