require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const appointmentRoutes =require("./routes/appointmentRoutes");
const queueRoutes =require("./routes/queueRoutes");
const doctorRoutes =require("./routes/doctorRoutes");
const hospitalDashboardRoutes =require("./routes/hospitalDashboardRoutes");
const adminRoutes =require("./routes/adminRoutes");

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/appointments",appointmentRoutes);
app.use("/api/queue",queueRoutes);
app.use("/api/doctors",doctorRoutes);
app.use("/api/hospital",hospitalDashboardRoutes);
app.use("/api/admin",adminRoutes);

app.get("/", (req, res) => {
  res.send("CodeBridge Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});