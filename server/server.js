const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/authRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const adminRoutes = require("./routes/admin");
const photoRoutes = require("./routes/photos");

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use("/api/user", userRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", photoRoutes);

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;