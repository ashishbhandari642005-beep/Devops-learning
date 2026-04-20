const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

/* Routes */
app.get("/", (req, res) => {
  res.send("CampusOps Backend Running 🚀");
});

/* Devices Route */
app.get("/api/devices", async (req, res) => {
  res.json([
    {
      name: "Lab-PC-01",
      lab: "Lab A",
      ip: "192.168.1.10",
      status: "Online",
      cpu: "45%",
      ram: "52%",
    },
    {
      name: "Server-01",
      lab: "Server Room",
      ip: "192.168.10.1",
      status: "Warning",
      cpu: "81%",
      ram: "74%",
    },
  ]);
});

/* Alerts Route */
app.get("/api/alerts", async (req, res) => {
  res.json([
    {
      title: "High CPU Usage",
      level: "Warning",
      message: "Server-01 CPU crossed 80%",
    },
    {
      title: "Device Offline",
      level: "Critical",
      message: "Lab-PC-12 disconnected",
    },
  ]);
});

/* Tickets Route */
app.get("/api/tickets", async (req, res) => {
  res.json([
    {
      id: "TK-101",
      issue: "Mouse not working",
      status: "Open",
    },
    {
      id: "TK-102",
      issue: "Projector issue",
      status: "Resolved",
    },
  ]);
});

/* Server Start */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});