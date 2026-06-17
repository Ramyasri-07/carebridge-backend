require("dotenv").config();

const mongoose = require("mongoose");
const Hospital = require("./models/Hospital");

mongoose.connect(process.env.MONGO_URI);

const hospitals = [
{
  name: "Government General Hospital",
  address: "Hyderabad",
  specialization: "General Medicine",
  rating: 4.7,
  waitTime: 20,

  location: {
    latitude: 17.3850,
    longitude: 78.4867
  }
},

{
  name: "Osmania General Hospital",
  address: "Hyderabad",
  specialization: "General Medicine",
  rating: 4.5,
  waitTime: 35,

  location: {
    latitude: 17.3713,
    longitude: 78.4737
  }
},

{
  name: "Government Chest Hospital",
  address: "Hyderabad",
  specialization: "Pulmonology",
  rating: 4.4,
  waitTime: 45,

  location: {
    latitude: 17.4040,
    longitude: 78.4840
  }
}
];

async function seed() {

  await Hospital.deleteMany();

  await Hospital.insertMany(hospitals);

  console.log("Hospitals Added");

  process.exit();
}

seed();