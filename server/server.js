const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/authRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/weather", weatherRoutes);

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
