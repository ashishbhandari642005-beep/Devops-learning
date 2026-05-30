const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  name: String,
  lab: String,
   ip: {
    type: String,
    unique: true,
    required: true
  },

  status: String,
  cpu: String,
  ram: String,
  disk: String,
  os: String,
  lastSeen: Date
});

module.exports = mongoose.model("Device", deviceSchema);