require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ============================
// MongoDB Connect
// ============================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ============================
// Schema
// ============================
const NewsSchema = new mongoose.Schema({
  country: { type: String, unique: true },
  news: [String],
  riskLevel: String,
  updatedAt: Date
});

const News = mongoose.model("News", NewsSchema);

// ============================
// Home Route
// ============================
app.get("/", (req, res) => {
  res.send("GeoNews Backend Running");
});

// ============================
// News Route (API + DB Cache)
// ============================
app.get("/news", async (req, res) => {
  try {
    const country = req.query.country || "India";

    // 1. Check DB cache (30 mins)
    const existing = await News.findOne({ country });

    if (
      existing &&
      existing.updatedAt &&
      (Date.now() - new Date(existing.updatedAt).getTime()) < 30 * 60 * 1000
    ) {
      console.log(`Served from DB: ${country}`);
      return res.json(existing);
    }

    // 2. Fetch Live News API
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(country)}&pageSize=6&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await axios.get(url);

    const headlines =
      response.data.articles?.map(article => article.title) || [];

    if (!headlines.length) {
      return res.json({
        country,
        news: ["No live news found"],
        riskLevel: "low"
      });
    }

    // 3. Risk detection
    let riskLevel = "low";
    const dangerWords = [
      "war",
      "attack",
      "terror",
      "missile",
      "conflict",
      "explosion"
    ];

    const combined = headlines.join(" ").toLowerCase();

    if (dangerWords.some(word => combined.includes(word))) {
      riskLevel = "high";
    } else if (headlines.length > 0) {
      riskLevel = "moderate";
    }

    // 4. Save / Update MongoDB
    const saved = await News.findOneAndUpdate(
      { country },
      {
        country,
        news: headlines,
        riskLevel,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    console.log(`Fetched from API & stored: ${country}`);

    res.json(saved);

  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      error: "Failed to fetch news"
    });
  }
});

// ============================
// Start Server
// ============================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});