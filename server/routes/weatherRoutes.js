const express = require("express");
const router = express.Router();
const axios = require("axios");
const getOptions = (location) => ({
  method: "GET",
  url: `https://open-weather13.p.rapidapi.com/city/${location}/EN`,
  headers: {
    'x-rapidapi-key': 'ab2df9360amshabdebef1a2dc7dfp16a777jsne56f30a47b8a',
    'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
  },
});

router.post("/weather", async (req, res) => {
  const location = req.body.location;

  if (!location) {
    return res.status(400).send("Location is required");
  }

  const options = getOptions(location);

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
