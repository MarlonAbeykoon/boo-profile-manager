const profileRepository = require("../repositories/profileRepository");

async function getAllProfiles(req, res, next) {
    try {
        const profiles = await profileRepository.findAll();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getProfileById(req, res, next) {
    try {
        const profile = await profileRepository.findById(req.params.id);
        res.render('profile_template', { profile });
    } catch (error) {
        next(error);
    }
}

async function createProfile(req, res, next) {
    try {
        const profile = await profileRepository.create(req.body);
        res.status(201).send('Profile created successfully');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProfiles,
    getProfileById,
    createProfile
};
