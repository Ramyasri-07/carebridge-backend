const Appointment = require("../models/Appointment");
const Queue = require("../models/Queue");
const Doctor = require("../models/Doctor");

const getHospitalAppointments = async (req, res) => {
  try {

    const { hospitalId } = req.params;

    const appointments =
      await Appointment.find({
        hospitalId
      })
      .populate(
        "patientId",
        "name email role"
      )
      .populate(
        "doctorId",
        "name specialization"
      );

    res.json(appointments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getHospitalQueue = async (req, res) => {
  try {

    const { hospitalId } = req.params;

    const queue =
  await Queue.find({
    hospitalId,
    status: {
      $in: [
        "Waiting",
        "In Progress"
      ]
    }
  })
      .populate(
        "patientId",
        "name email"
      )
      .sort("tokenNumber");

    res.json(queue);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const updateQueueStatus = async (req, res) => {
  try {

    const { queueId } = req.params;
    const { status } = req.body;

    const queue =
      await Queue.findByIdAndUpdate(
        queueId,
        {
          status
        },
        {
          new: true
        }
      );

    res.json(queue);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const startConsultation = async (req, res) => {
  try {

    const queue =
      await Queue.findByIdAndUpdate(
        req.params.queueId,
        {
          status: "In Progress",
          startedAt: new Date()
        },
        {
          new: true
        }
      );

    res.json(queue);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const completeConsultation = async (req, res) => {
  try {

    const queue =
      await Queue.findById(
        req.params.queueId
      );

    queue.status = "Completed";
    queue.completedAt = new Date();

    const duration =
      (
        queue.completedAt -
        queue.startedAt
      ) / 60000;

    queue.consultationDuration =
      duration;

    await queue.save();
    await Appointment.findOneAndUpdate(
  {
    patientId: queue.patientId,
    hospitalId: queue.hospitalId,
    status: "Pending"
  },
  {
    status: "Completed"
  }
);

    res.json({
      queue,
      consultationTimeMinutes:
        duration.toFixed(2)
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const getHospitalStats = async (req, res) => {
  try {

    const { hospitalId } = req.params;
    console.log("Stats Hospital ID:", hospitalId);

    const totalDoctors =
      await Doctor.countDocuments({
        hospitalId
      });

    console.log("Doctors Count:", totalDoctors);

    const totalAppointments =
      await Appointment.countDocuments({
        hospitalId
      });

    const waitingPatients =
      await Queue.countDocuments({
        hospitalId,
        status: "Waiting"
      });

    const completedPatients =
      await Queue.countDocuments({
        hospitalId,
        status: "Completed"
      });

    res.json({
      totalDoctors,
      totalAppointments,
      waitingPatients,
      completedPatients
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};





module.exports = {
  getHospitalAppointments,
  getHospitalQueue,
  updateQueueStatus,
  startConsultation,
  completeConsultation,
  getHospitalStats
};