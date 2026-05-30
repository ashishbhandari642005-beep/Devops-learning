const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const deviceRoutes = require("./routes/deviceRoutes");
const alertRoutes = require("./routes/alertRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

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

/* API Routes */
app.use("/api/devices", deviceRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/tickets", ticketRoutes);

/* Server Start */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});