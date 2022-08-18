let express = require("express");
const { getHavestDetail, getHavests, createHavest, isHavester, updateHavest, isHavest } = require("../Controllers/havest");

let router = express.Router();

router.get('/', getHavests)

router.get('/:id', getHavestDetail)

router.post('/',requireAuth,IsAuth, createHavest)

router.patch('/:id',requireAuth,IsAuth,isHavester, updateHavest)

router.param("id", isHavest)

module.exports = router