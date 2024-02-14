const express = require('express');
const router = express.Router();
const {getAllProfiles, getProfileById, createProfile} = require("../controllers/ProfileController");

router.get('/', getAllProfiles)
router.get('/:id', getProfileById)
router.post('/', createProfile);

module.exports = router;
