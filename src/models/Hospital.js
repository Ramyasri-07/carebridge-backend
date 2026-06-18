const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  specialization: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    default: 4
  },

  waitTime: {
    type: Number,
    default: 15
  },

  currentQueue: {
    type: Number,
    default: 0
  },

  city: String,

  state: String,

  district: String,

  reviews: {
    type: Number,
    default: 0
  },

  location: {
    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    }
  }
},
{
  timestamps: true
}
);

hospitalSchema.index({
  name: 1
});

hospitalSchema.index({
  specialization: 1
});

module.exports = mongoose.model(
  "Hospital",
  hospitalSchema
);