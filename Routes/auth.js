let express = require("express");
const { register,login } = require("../Controllers/user");
let router = express.Router();
 
// s"enregistrer
router.post("/register", register)
// s'authentifier
router.post("/signin", login)
module.exports = router;
