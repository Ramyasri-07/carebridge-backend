const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
{
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },

  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },

  appointmentDate: {
    type: Date
  },

  status: {
    type: String,
    default: "Pending"
  }
},
{
  timestamps: true
}
);
appointmentSchema.index({
  hospitalId: 1
});

appointmentSchema.index({
  patientId: 1
});

appointmentSchema.index({
  doctorId: 1
});

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);