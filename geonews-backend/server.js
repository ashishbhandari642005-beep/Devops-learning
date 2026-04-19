require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("GeoNews Backend Running");
});

app.get("/news", (req, res) => {
  const country = req.query.country;

  res.json({
    country,
    news: [
      "Sample news 1",
      "Sample news 2",
      "Sample news 3"
    ],
    riskLevel: "moderate"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});