const express = require("express");
const router = express.Router();

const Ticket = require("../models/Ticket");

/* Get Tickets */
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({
      createdAt: -1
    });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* Create Ticket */
router.post("/", async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* Resolve Ticket */
router.patch("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );

    res.json(ticket);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;