require("dotenv").config();

const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");

const Hospital = require("./models/Hospital");

mongoose.connect(process.env.MONGO_URI);

const hospitals = [];

fs.createReadStream(
  "./data/Hospitals.csv"
)
.pipe(csv())

.on("data", (row) => {

  hospitals.push({

    name: row.id || `${row.City || "Unknown"} Hospital`,

    address: row.City || "Unknown",

    city: row.City,

    state: row.State,

    district: row.District,

    specialization: "General Medicine",

    rating: Number(row.Rating) || 4,

    reviews:
      Number(row["Number of Reviews"]) || 0,

    waitTime:
      Math.floor(Math.random() * 30) + 10,

    currentQueue:
      Math.floor(Math.random() * 20),

    location: {
      latitude:
        Number(row.Latitude) || 0,

      longitude:
        Number(row.Longitude) || 0
    }

  });

})

.on("end", async () => {

  try {

    await Hospital.deleteMany();

    await Hospital.insertMany(
      hospitals
    );

    console.log(
      `${hospitals.length} hospitals imported`
    );

    process.exit(0);

  } catch (err) {

    console.error(err);
    process.exit(1);

  }

});