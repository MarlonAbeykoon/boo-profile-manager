const { createUser } = require('../../controllers/userController');
const userRepository = require('../../repositories/userRepository');

jest.mock('../../repositories/userRepository');

describe('User Operations', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should successfully create a user and return the created user object', async () => {
            const req = {
                body: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    password: 'securePassword123'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            userRepository.createUser.mockResolvedValue({
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com'
            });

            await createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com'
            });
        });

        it('should call next with an error if the creation fails', async () => {
            const req = { body: {} };
            const res = {};
            const next = jest.fn();

            const error = new Error('Creation failed');
            userRepository.createUser.mockRejectedValue(error);

            await createUser(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

});
