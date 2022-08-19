let express = require("express");
const { getOrders, postOrders, updateOder, removeOrder, getOrderDetail, orderById, bigOrder } = require("../Controllers/orders");
const { IsAuth, requireAuth } = require("../Controllers/user");
let router = express.Router();



// CRUD product
router.use(requireAuth)
router.use(IsAuth)
router.get("/", getOrders );

router.get("/g", getOrderDetail);

router.get("/big", bigOrder);


router.post("/",postOrders);

router.patch("/:id", updateOder);

router.delete("/:id", removeOrder);

router.param("id", orderById)

module.exports = router;
