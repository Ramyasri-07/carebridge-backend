const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  specialization: {
    type: String,
    required: true
  },

  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },

  availability: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  "Doctor",
  doctorSchema
);