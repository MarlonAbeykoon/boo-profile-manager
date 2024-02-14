const userRepository = require("../repositories/userRepository");

async function createUser(req, res, next) {
    try {
        const user = await userRepository.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser
};
