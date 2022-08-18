let express = require("express");
const {  isPoster, createHavest, getHavest, getHavestDetail, updateHavest, isHavest, isAdmin, deleteHavest } = require("../Controllers/havest");
const { requireAuth, IsAuth } = require("../Controllers/user");
let router = express.Router();
router.get('/', getHavest)
router.get('/:id', getHavestDetail)

router.post('/',requireAuth,IsAuth, createHavest)

router.patch('/:id',requireAuth,IsAuth,isPoster, updateHavest)
router.delete("/:id",requireAuth,IsAuth, deleteHavest)
router.param("id", isHavest)

module.exports = router