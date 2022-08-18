const express = require("express");
const { register, sign_in } = require("../controllers/user");
const User = require("../Models/User");
const router = express.Router();

router.post("/register", register)
router.post("/signin", sign_in)

module.exports = router