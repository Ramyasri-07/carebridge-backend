const Appointment = require("../models/Appointment");
const Queue = require("../models/Queue");

const createAppointment = async (req, res) => {
  try {

    const {
      hospitalId,
      doctorId,
      appointmentDate
    } = req.body;

   const appointment =
  await Appointment.create({
    patientId: req.user.userId,
    doctorId,
    hospitalId,
    appointmentDate: appointmentDate || new Date()
  });

    const queueCount =
      await Queue.countDocuments({
        hospitalId
      });

    await Queue.create({
      hospitalId,
      patientId: req.user.userId,
      tokenNumber: queueCount + 1
    });

    res.status(201).json({
      message: "Appointment Booked",
      appointment
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const getMyAppointments = async (req, res) => {
  try {

    const appointments =
  await Appointment.find({
    patientId: req.user.userId
  })
  .populate("hospitalId")
  .populate("doctorId");

    res.status(200).json(appointments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const cancelAppointment = async (req, res) => {
  try {

    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        {
          status: "Cancelled"
        },
        {
          new: true
        }
      );


    res.json(appointment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const getPatientStats = async (req, res) => {
  try {

    const appointments =
      await Appointment.countDocuments({
        patientId: req.user.userId
      });

    const activeQueue =
      await Queue.countDocuments({
        patientId: req.user.userId,
        status: "Waiting"
      });

    const completedAppointments =
      await Appointment.countDocuments({
        patientId: req.user.userId,
        status: "Completed"
      });

    res.json({
      appointments,
      activeQueue,
      completedAppointments
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


module.exports = {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
  getPatientStats
};