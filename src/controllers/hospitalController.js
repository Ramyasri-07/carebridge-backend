const Hospital = require("../models/Hospital");
const geolib = require("geolib");
const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getNearbyHospitals = async (req, res) => {
  try {

    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);

    const hospitals = await Hospital.find();

    const nearbyHospitals = hospitals
      .map((hospital) => {

        const distance =
          geolib.getDistance(
            {
              latitude: lat,
              longitude: lng
            },
            {
              latitude:
                hospital.location.latitude,
              longitude:
                hospital.location.longitude
            }
          );

        return {
          ...hospital.toObject(),
          distanceKm:
            (distance / 1000).toFixed(2)
        };
      })

      .filter(
        (hospital) =>
          Number(hospital.distanceKm) <= 10
      )

      .sort(
        (a, b) =>
          Number(a.distanceKm) -
          Number(b.distanceKm)
      );

    res.json(nearbyHospitals);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const createHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json({
      message: "Hospital Created",
      hospital
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getHospitals,
  getNearbyHospitals,
  createHospital
};