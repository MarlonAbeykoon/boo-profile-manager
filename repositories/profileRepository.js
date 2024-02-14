const Profile = require('../models/Profile');

class ProfileRepository {
    async findAll() {
        try {
            return await Profile.find();
        } catch (error) {
            throw new Error(`Error retrieving profiles: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const profile = await Profile.findById(id);
            if (!profile) {
                throw new Error('Profile not found');
            }
            return profile;
        } catch (error) {
            throw new Error(`Error finding profile by ID: ${error.message}`);
        }
    }

    async create(profileData) {
        try {
            const profile = new Profile({
                ...profileData,
                image: profileData.image || "https://soulverse.boo.world/images/1.png"
            });
            await profile.save();
            return profile;
        } catch (error) {
            throw new Error(`Error creating profile: ${error.message}`);
        }
    }
}

module.exports = new ProfileRepository();
