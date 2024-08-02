const express = require("express");
const router = express.Router();
const axios = require("axios");

const getWeatherData = async (city) => {
  const options = {
    method: "GET",
    url: `https://open-weather13.p.rapidapi.com/city/${city}/EN`,
    headers: {
      "x-rapidapi-key": "ab2df9360amshabdebef1a2dc7dfp16a777jsne56f30a47b8a",
      "x-rapidapi-host": "open-weather13.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

router.get("/:city", async (req, res) => {
  const city = req.params.city;

  if (!city) {
    return res.status(400).send("City is required");
  }

  try {
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
