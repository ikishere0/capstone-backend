const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/movie/:type/:id", async (req, res) => {
  const { type, id } = req.params;

  const options = {
    method: "GET",
    url: "https://streaming-availability.p.rapidapi.com/shows/%7Btype%7D/%7Bid%7D",
    headers: {
      "x-rapidapi-key": "ab2df9360amshabdebef1a2dc7dfp16a777jsne56f30a47b8a",
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching movie data");
  }
});

module.exports = router;
