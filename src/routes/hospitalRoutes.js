const express = require("express");

const {
  getHospitals,
  getNearbyHospitals,
  createHospital
} = require("../controllers/hospitalController");

const router = express.Router();

router.get("/", getHospitals);

router.post("/", createHospital);

router.get(
  "/nearby",
  getNearbyHospitals
);

module.exports = router;