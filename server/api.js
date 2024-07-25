const axios = require("axios");

const options = {
  method: "GET",
  url: "http://www.omdbapi.com/?i=tt3896198&apikey=588bd3cd",
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
