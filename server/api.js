const axios = require("axios");

const getOptions = (location) => ({
  method: "GET",
  url: `https://open-weather13.p.rapidapi.com/city/${location}/EN`,
  headers: {
    'x-rapidapi-key': 'ab2df9360amshabdebef1a2dc7dfp16a777jsne56f30a47b8a',
    'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
  },
});

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
