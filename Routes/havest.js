let express = require("express");
const { createHavest, getHavests, getHavestDetail, updateHavest, isHavest, isHavester, deleteHavest, isAdmin } = require("../Controllers/havest");
const { requireAuth, IsAuth } = require("../Controllers/user");
let router = express.Router();
router.get('/', getHavests)
router.get('/:id', getHavestDetail)

router.post('/',requireAuth,IsAuth, createHavest)

router.patch('/:id', requireAuth, IsAuth, isHavester, updateHavest)

router.delete('/:id', requireAuth, IsAuth, deleteHavest,isAdmin)

router.param("id", isHavest)

module.exports = router