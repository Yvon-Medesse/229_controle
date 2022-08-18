let express = require("express");
const {IsAuth, requireAuth } = require("../Controllers/user");
let router = express.Router();

router.use(requireAuth)
router.use(IsAuth)
router.get("/:id");

module.exports = router;
