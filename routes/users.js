const express = require('express');
const router = express.Router({ mergeParams: true });
const {createUser} = require("../controllers/UserController");

router.post('/', createUser)

module.exports = router;
