let express = require("express");
const { register, sign_in } = require("../Controllers/user");
let router = express.Router();

router.post("/register", register)

router.post("/signin", sign_in)



module.exports = router;
