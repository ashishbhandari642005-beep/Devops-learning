const express = require("express");
const router = express.Router();

const Device = require("../models/Device");

/* Get All Devices */
router.get("/", async (req, res) => {
  try {
    const now = Date.now();

    const devices = await Device.find().lean();

    const updated = devices.map((d) => {
      const diff = d.lastSeen
        ? (now - new Date(d.lastSeen).getTime()) / 1000
        : 999999;

      return {
        ...d,
        status: diff > 120 ? "Offline" : "Online"
      };
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* Heartbeat Route */
router.post("/heartbeat", async (req, res) => {
  try {
    const data = req.body;

    const updated = await Device.findOneAndUpdate(
      { ip: data.ip },
      {
        ...data,
        status: "Online",
        lastSeen: new Date()
      },
      {
        upsert: true,
        new: true
      }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* Add New Device */
router.post("/", async (req, res) => {
  try {
    const device = await Device.create(req.body);

    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;