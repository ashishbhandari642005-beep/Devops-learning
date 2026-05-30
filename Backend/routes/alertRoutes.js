const express = require("express");
const router = express.Router();

const Alert = require("../models/Alert");

/* Get Alerts */
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({
      createdAt: -1
    });

    res.json(alerts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* Create Alert */
router.post("/", async (req, res) => {
  try {
    const alert = await Alert.create(req.body);

    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;