import what2wear from "../assets/WHAT2WEAR.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/Login");
  };

  const goToWeather = () => {
    navigate("/WeatherSearch");
  };
  return (
    <div className="welcome-container">
      <img src={what2wear} alt="landing" />
      <h1 className="welcome-title">
        <br />
        WHAT2WEAR provides you with the best clothing suggestions based on
        current weather conditions. <br></br> No more guessing! Just great
        style, every day.
      </h1>
      <p className="home-paragrpah">
        Have you ever felt embarrassed because you were sweating from the heat
        during an important appointment?
        <br />
        Or have you ever shivered in the cold because you went out in light
        clothing, thinking it would be warm?
        <br />
        With what2wear, you can find the perfect outfit for the current weather
        conditions. It provides real-time weather information, shows you photos
        of outfits that match the temperature, and lets you save those photos.
        Stop worrying about what to wear and click the button below to check the
        weather and see outfits that are just right for you!
      </p>
      <div className="home-button-container">
        <button className="home-button" onClick={goToLogin}>
          Login
        </button>
        <button className="home-button" onClick={goToWeather}>
          Search Weather
        </button>
      </div>
    </div>
  );
};

export default Home;
