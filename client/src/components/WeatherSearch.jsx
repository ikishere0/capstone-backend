import { useState, useEffect, useCallback } from "react";
import { fetchWeather } from "../weatherapi";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [category, setCategory] = useState("all");

  const convertTemp = (tempF) => ((tempF - 32) * 5) / 9;

  const getPhotos = async () => {
    const res = await fetch('/api/photos');
    const data = await res.json();
    setPhotos(data);
  };

  const filterPhotos = useCallback(() => {
    if (!weatherData) return;

    const temp = isCelsius ? convertTemp(weatherData.main.temp) : weatherData.main.temp;

    const filtered = photos.filter(photo => 
      (category === "all" || photo.category === category) &&
      temp >= photo.minTemp && temp <= photo.maxTemp
    );

    setFilteredPhotos(filtered);
  }, [photos, category, weatherData, isCelsius]);

  useEffect(() => {
    if (weatherData) {
      getPhotos();
    }
  }, [weatherData]);

  useEffect(() => {
    filterPhotos();
  }, [photos, category, weatherData, isCelsius, filterPhotos]);

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

  const toggleTempUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
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
              ? `${convertTemp(weatherData.main.temp).toFixed(2)}°C`
              : `${weatherData.main.temp}°F`}
          </p>
          <button onClick={toggleTempUnit}>
            {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
          </button>
          <div>
            <button onClick={() => handleCategoryChange('all')}>All</button>
            <button onClick={() => handleCategoryChange('women')}>Women</button>
            <button onClick={() => handleCategoryChange('men')}>Men</button>
          </div>
          <div className="image-grid">
            {filteredPhotos.map((photo, index) => (
              <div key={index} className="image-item">
                <img src={photo.url} alt="weather related" />
                <p>{photo.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
