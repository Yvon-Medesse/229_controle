let express = require("express");
const { register, sign_in } = require("../Controllers/user");
let router = express.Router();

router.post("/auth/register", register)

router.post("/auth/signin", sign_in)



module.exports = router;
