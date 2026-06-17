const express = require("express");

const {
  getHospitalAppointments,
  getHospitalQueue,
  updateQueueStatus,
   startConsultation,
  completeConsultation,
  getHospitalStats
} = require(
  "../controllers/hospitalDashboardController"
);

const router = express.Router();

router.get(
  "/appointments/:hospitalId",
  getHospitalAppointments
);

router.get(
  "/queue/:hospitalId",
  getHospitalQueue
);

router.put(
  "/queue/:queueId",
  updateQueueStatus
);
router.put(
  "/queue/:queueId/start",
  startConsultation
);

router.put(
  "/queue/:queueId/complete",
  completeConsultation
);
router.get(
  "/stats/:hospitalId",
  getHospitalStats
);


module.exports = router;