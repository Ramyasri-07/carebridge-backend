const express = require("express");

const protect =
require("../middleware/authMiddleware");

const {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
  getPatientStats
} = require(
  "../controllers/appointmentController"
);

const router = express.Router();

router.post(
  "/",
  protect,
  createAppointment
);

router.get(
  "/",
  protect,
  getMyAppointments
);

router.put(
  "/cancel/:id",
  protect,
  cancelAppointment
);

router.get(
  "/dashboard",
  protect,
  getPatientStats
);

module.exports = router;