const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/movie", async (req, res) => {
  const options = {
    method: "GET",
    url: "http://www.omdbapi.com/?i=tt3896198&apikey=588bd3cd",
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching movie data");
  }
});

module.exports = router;
