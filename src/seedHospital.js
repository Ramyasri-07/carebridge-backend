require("dotenv").config();

const mongoose = require("mongoose");
const Hospital = require("./models/Hospital");
const Doctor = require("./models/Doctor");

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
{
  name: "Apollo Hospital",
  address: "Hyderabad",
  specialization: "Multi Speciality",
  rating: 4.9,
  waitTime: 12,
  location: {
    latitude: 17.4435,
    longitude: 78.3772
  }
},

{
  name: "Yashoda Hospital",
  address: "Hyderabad",
  specialization: "Orthopedics",
  rating: 4.8,
  waitTime: 15,
  location: {
    latitude: 17.4415,
    longitude: 78.4983
  }
},

{
  name: "Andhra Hospitals",
  address: "Vijayawada",
  specialization: "Cardiology",
  rating: 4.7,
  waitTime: 10,
  location: {
    latitude: 16.5062,
    longitude: 80.6480
  }
},

{
  name: "Manipal Hospital",
  address: "Vijayawada",
  specialization: "Neurology",
  rating: 4.6,
  waitTime: 18,
  location: {
    latitude: 16.5100,
    longitude: 80.6500
  }
},

{
  name: "AIIMS Bibinagar",
  address: "Hyderabad",
  specialization: "Multi Speciality",
  rating: 4.5,
  waitTime: 22,
  location: {
    latitude: 17.5810,
    longitude: 78.8210
  }
},

{
  name: "NIMS Hospital",
  address: "Hyderabad",
  specialization: "General Medicine",
  rating: 4.4,
  waitTime: 25,
  location: {
    latitude: 17.4239,
    longitude: 78.4483
  }
}
];

async function seed() {
  try {
    await Hospital.deleteMany();
    await Doctor.deleteMany();

    const createdHospitals = await Hospital.insertMany(hospitals);
    console.log("Hospitals Added");

    const ggh = createdHospitals.find(h => h.name === "Government General Hospital");
    const ogh = createdHospitals.find(h => h.name === "Osmania General Hospital");
    const gch = createdHospitals.find(h => h.name === "Government Chest Hospital");

    const doctors = [
      {
        name: "Dr. A. Srinivas",
        specialization: "General Medicine",
        hospitalId: ggh._id,
        availability: true
      },
      {
        name: "Dr. K. Anuradha",
        specialization: "General Medicine",
        hospitalId: ggh._id,
        availability: true
      },
      {
        name: "Dr. M. Rakesh",
        specialization: "General Medicine",
        hospitalId: ogh._id,
        availability: true
      },
      {
        name: "Dr. S. Deepthi",
        specialization: "Cardiology",
        hospitalId: ogh._id,
        availability: true
      },
      {
        name: "Dr. P. Venkatesh",
        specialization: "Pulmonology",
        hospitalId: gch._id,
        availability: true
      }
    ];

    await Doctor.insertMany(doctors);
    console.log("Doctors Added");

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();