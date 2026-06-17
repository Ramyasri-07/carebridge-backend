const express = require("express");

const protect =
require("../middleware/authMiddleware");

const {
  getMyQueue
} = require(
  "../controllers/queueController"
);

const router = express.Router();

router.get(
  "/",
  protect,
  getMyQueue
);

module.exports = router;