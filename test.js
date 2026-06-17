require("dotenv").config();

const { MongoClient } = require("mongodb");

async function run() {
  try {
    console.log("Connecting to MongoDB...");

    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();

    console.log("✅ MongoDB Connected Successfully!");

    await client.db("admin").command({ ping: 1 });

    console.log("✅ Ping Successful!");

    await client.close();
  } catch (err) {
    console.error("❌ Error:");
    console.error(err);
  }
}

run();