const express = require("express");
const router = express.Router();
const axios = require("axios");

// API 요청 옵션을 생성하는 함수
const getOptions = (location) => ({
  method: "GET",
  url: `https://open-weather13.p.rapidapi.com/city/${location}/EN`,
  headers: {
    'x-rapidapi-key': 'ab2df9360amshabdebef1a2dc7dfp16a777jsne56f30a47b8a',
    'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
  },
});

// /weather 경로에 대한 POST 요청 핸들러
router.post("/weather", async (req, res) => {
  const location = req.body.location; // 요청 본문에서 location을 가져옴

  if (!location) {
    return res.status(400).send("Location is required");
  }

  const options = getOptions(location); // 해당 location에 대한 API 요청 옵션을 생성

  try {
    const response = await axios.request(options); // API 요청
    console.log(response.data);
    res.json(response.data); // 응답 데이터를 JSON 형식으로 클라이언트에 보냄
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred"); // 에러가 발생하면 500 상태 코드와 함께 에러 메시지를 클라이언트에 보냄
  }
});

module.exports = router;
