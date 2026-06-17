const User = require("../models/User");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Queue = require("../models/Queue");

const getAllUsers = async (req, res) => {
 const users = await User.find().select("-password");
  res.json(users);
};

const getAllHospitals = async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
};

const getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find()
    .populate("hospitalId");
  res.json(doctors);
};

const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find()
    .populate("patientId")
    .populate("hospitalId")
    .populate("doctorId");

  res.json(appointments);
};

const getAllQueues = async (req, res) => {
  const queues = await Queue.find()
    .populate("patientId")
    .populate("hospitalId");

  res.json(queues);
};

module.exports = {
  getAllUsers,
  getAllHospitals,
  getAllDoctors,
  getAllAppointments,
  getAllQueues
};