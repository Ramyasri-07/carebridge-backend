const Queue = require("../models/Queue");

const getMyQueue = async (req, res) => {
  try {

    const queue = await Queue.findOne({
      patientId: req.user.userId,
      status: "Waiting"
    })
    .populate("hospitalId");

    if (!queue) {
      return res.status(404).json({
        message: "No active queue found"
      });
    }

    const patientsAhead =
      await Queue.countDocuments({
        hospitalId: queue.hospitalId._id,
        tokenNumber: {
          $lt: queue.tokenNumber
        },
        status: "Waiting"
      });

    const estimatedWait =
      patientsAhead * 5;

    res.json({
      tokenNumber:
        queue.tokenNumber,

      position:
        patientsAhead + 1,

      estimatedWait,

      hospital:
        queue.hospitalId.name
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  getMyQueue
};