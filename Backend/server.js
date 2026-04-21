const Device = require("./models/Device");
const Alert = require("./models/Alert");
const Ticket = require("./models/Ticket");
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

/* Home Route */
app.get("/", (req, res) => {
  res.send("CampusOps Backend Running 🚀");
});

/* =========================
   DEVICES ROUTES
========================= */

/* Get All Devices */
app.get("/api/devices", async (req, res) => {
  try {
    const devices = await Device.find();
    const now = Date.now();

    const updated = await Promise.all(
      devices.map(async (d) => {
        if (!d.lastSeen) {
          d.status = "Offline";

          const exists = await Alert.findOne({
            title: "Device Offline",
            message: `${d.name} is offline`
          });

          if (!exists) {
            await Alert.create({
              title: "Device Offline",
              level: "Critical",
              message: `${d.name} is offline`
            });
          }

          return d;
        }

        const diff =
          (now - new Date(d.lastSeen).getTime()) / 1000;

        if (diff > 120) {
          d.status = "Offline";

          const exists = await Alert.findOne({
            title: "Device Offline",
            message: `${d.name} is offline`
          });

          if (!exists) {
            await Alert.create({
              title: "Device Offline",
              level: "Critical",
              message: `${d.name} is offline`
            });
          }
        }

        return d;
      })
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Add New Device */


app.post("/api/heartbeat", async (req, res) => {
  try {
    const data = req.body;

    await Device.findOneAndUpdate(
      { ip: data.ip },
      {
        ...data,
        status: "Online",
        lastSeen: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({ message: "Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



/* =========================
   ALERTS ROUTES
========================= */

app.get("/api/alerts", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/tickets", async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   TICKETS ROUTES
========================= */

app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/tickets", async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/api/tickets/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* Server Start */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});