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
        WeatherWear provides you with the best clothing suggestions based on
        current weather conditions. <br></br> No more guessing! Just great
        style, every day.
      </h1>
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
