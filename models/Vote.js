const mongoose = require('mongoose');
const enneagramTypes = require('../enums/EnneagramTypes');
const zodiacSigns = require('../enums/ZodiacSigns');
const MBTITypes = require('../enums/MBTITypes');

const voteSchema = new mongoose.Schema({
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    mbti: { type: String, enum: MBTITypes },
    enneagram: { type: String, enum: enneagramTypes },
    zodiac: { type: String, enum: zodiacSigns },
    createdAt: { type: Date, default: Date.now }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;


