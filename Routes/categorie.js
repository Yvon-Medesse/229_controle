let express = require("express");
const { createCategory } = require("../Controllers/categorie");
const router = express.Router();

router.post('/', createCategory)

module.exports = router