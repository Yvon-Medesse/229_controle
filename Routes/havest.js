let express = require("express");
const { postHavest, updateHavest, IsAdmin, deleteHavest, getHavests, getHavestDetails, isHavest, isHavester } = require("../Controllers/havest");
const { Auth, IsAuth } = require("../Controllers/user");
let router = express.Router();

router.get("/", getHavests)

router.get("/:id", getHavestDetails)

router.post("/", Auth, IsAuth, postHavest);

router.patch("/:id",Auth,IsAuth,isHavester, updateHavest)

router.delete("/:id",Auth,IsAuth,IsAdmin,deleteHavest)

router.param("id",isHavest)

module.exports = router 
