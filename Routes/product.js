let express = require("express");
const { getProducts, postProducts, updateProduct, removeProduct, getDetail, productById, addstock } = require("../Controllers/product");
const { IsAuth } = require("../Controllers/user");
let router = express.Router();



// CRUD product
router.use(IsAuth)
router.get("/",getProducts );

router.get("/:id", getDetail);

router.post("/",postProducts);

router.patch("/:id", updateProduct);

router.patch("/", addstock);

router.delete("/:id",removeProduct);

router.param("id", productById)



module.exports = router;
