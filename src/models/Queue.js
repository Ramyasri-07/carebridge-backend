const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
{
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  tokenNumber: {
    type: Number
  },

  status: {
    type: String,
    default: "Waiting"
  },

  startedAt: {
    type: Date
  },

  completedAt: {
    type: Date
  },

  consultationDuration: {
    type: Number
  }
},
{
  timestamps: true
}
);
queueSchema.index({
  hospitalId: 1,
  status: 1
});

module.exports = mongoose.model(
  "Queue",
  queueSchema
);