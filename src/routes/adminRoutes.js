const express = require("express");

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  getAllUsers,
  getAllHospitals,
  getAllDoctors,
  getAllAppointments,
  getAllQueues
} = require("../controllers/adminController");

const router = express.Router();

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.get(
  "/hospitals",
  protect,
  authorize("admin"),
  getAllHospitals
);

router.get(
  "/doctors",
  protect,
  authorize("admin"),
  getAllDoctors
);

router.get(
  "/appointments",
  protect,
  authorize("admin"),
  getAllAppointments
);

router.get(
  "/queues",
  protect,
  authorize("admin"),
  getAllQueues
);

module.exports = router;