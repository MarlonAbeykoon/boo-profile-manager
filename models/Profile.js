const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    mbti: String,
    enneagram: String,
    variant: String,
    tritype: { type: Number, min: 1, max: 999 },
    socionics: String,
    sloan: String,
    psyche: String,
    image: { type: String, default: 'https://soulverse.boo.world/images/default.png' }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;