const { app } = require("./server/shared/shared");
const path = require("path");
const cors = require("cors");
const pg = require("pg");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});

const userRoutes = require("./server/routes/authRoutes");
app.use("/api/user", userRoutes);

const movieRoutes = require("./server/routes/movieRoutes");
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("Home");
});
