let express = require("express");
const { profile, userProfile, IsAuth, requireAuth } = require("../Controllers/user");
let router = express.Router();

// CRUD USER
router.use(requireAuth)
router.use(IsAuth)
router.get("/:id",profile, userProfile );


module.exports = router;
