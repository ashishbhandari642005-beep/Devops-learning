const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  id: String,
  issue: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ticket", ticketSchema);