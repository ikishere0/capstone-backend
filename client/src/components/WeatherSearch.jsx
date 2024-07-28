
import { useState } from "react";
import { fetchWeather } from "../weatherapi";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemperature = (tempFahrenheit) => {
    return ((tempFahrenheit - 32) * 5) / 9;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h3>Weather in {weatherData.name}</h3>
          <p>{weatherData.weather[0].description}</p>
          <p>
            {isCelsius
              ? `${convertTemperature(weatherData.main.temp).toFixed(2)}°C`
              : `${weatherData.main.temp}°F`}
          </p>
          <button onClick={toggleTemperatureUnit}>
            {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
          </button>
          <div className="image-grid">
            {weatherData.images &&
              weatherData.images.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.url} alt="weather related" />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
