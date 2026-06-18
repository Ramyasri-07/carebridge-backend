const Doctor = require("../models/Doctor");

const createDoctor = async (req, res) => {
  try {

    const doctor =
      await Doctor.create(req.body);

    res.status(201).json({
      message: "Doctor Created",
      doctor
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getDoctors = async (req, res) => {
  try {

    const doctors =
      await Doctor.find()
      .populate("hospitalId");

    res.json(doctors);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const getDoctorsByHospital =
async (req, res) => {

  const doctors =
    await Doctor.find({
      hospitalId:
        req.params.hospitalId
    });

  res.json(doctors);
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorsByHospital
};