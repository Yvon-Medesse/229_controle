const express = require("express");

const {
  gethavest,
  getDetails,
  havestById,
  updatehavest,
  createhavest,
  removehavest,
} = require("../controllers/havest");

const havest = require("../Models/havest");
let router = express.Router();

router.post("/", createhavest);

router.patch("/:id", updatehavest);

router.delete("/:id", removehavest);

router.get("/", gethavest);

router.get("/:id", getDetails);

router.param("id", havestById);

module.exports = router;
