const User = require('../models/User');

async function createUser(userData) {
    const user = new User(userData);
    await user.save();
    return user;
}

module.exports = {
    createUser
};
