let express = require("express");
const { register, sign_in } = require("../Controllers/user");
let router = express.Router();

router.post("/signup", register)

router.post("/login", sign_in)

module.exports = router;
