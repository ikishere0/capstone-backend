import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLikedPhoto, removeLikedPhoto } from "../slices/likedPhotosSlice";
import { fetchWeather } from "../weatherapi";
import "./WeatherSearch.css";

const WeatherSearch = () => {
  const dispatch = useDispatch();
  const likedPhotos = useSelector((state) => state.likedPhotos);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [category, setCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const convertToCelsius = (tempF) => ((tempF - 32) * 5) / 9;

  const getPhotos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/photos");
      const data = await res.json();
      console.log("Fetched photos:", data);
      setPhotos(data);
    } catch (err) {
      console.error("Failed to fetch photos:", err);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    if (!weatherData) return;

    const filterPhotos = () => {
      let temp = weatherData.main.temp;

      console.log(`Current Temp: ${temp} F`);

      const filtered = photos.filter((photo) => {
        const minTemp = photo.minTemp;
        const maxTemp = photo.maxTemp;

        const isTempInRange = temp >= minTemp && temp <= maxTemp;
        const isCategoryMatch =
          category === "all" || photo.category === category;

        console.log(
          `Photo ID: ${photo.id}, Min Temp: ${minTemp}, Max Temp: ${maxTemp}, In Range: ${isTempInRange}, Category Match: ${isCategoryMatch}`
        );

        return isTempInRange && isCategoryMatch;
      });

      console.log("Filtered photos:", filtered);
      setFilteredPhotos(filtered);
    };

    filterPhotos();
  }, [photos, category, weatherData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await fetchWeather(city);
      console.log("Fetched weather data:", data);
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

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleClosePopup = () => {
    setSelectedPhoto(null);
  };

  const handleLike = async (photo) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/user/likePhoto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ photoId: photo.id }),
      });

      if (response.ok) {
        dispatch(
          likedPhotos.some((likedPhoto) => likedPhoto.id === photo.id)
            ? removeLikedPhoto(photo.id)
            : addLikedPhoto(photo)
        );
      } else if (response.status === 401) {
        const errorData = await response.json();
        if (errorData.error === "Token expired.") {
          alert("Session expired. Please log in again.");
          navigate("/login");
        } else {
          alert("Unauthorized access. Please log in.");
          navigate("/login");
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to like photo");
      }
    } catch (error) {
      console.error("Failed to like photo:", error);
    }
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
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
              ? `${convertToCelsius(weatherData.main.temp).toFixed(2)}°C`
              : `${weatherData.main.temp.toFixed(2)}°F`}
          </p>
          <button onClick={toggleTempUnit}>
            {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
          </button>
          <div>
            <button onClick={() => handleCategoryChange("all")}>All</button>
            <button onClick={() => handleCategoryChange("women")}>Women</button>
            <button onClick={() => handleCategoryChange("men")}>Men</button>
          </div>
          <div className="image-grid">
            {filteredPhotos.map((photo, index) => (
              <div
                key={index}
                className="image-item"
                onClick={() => handlePhotoClick(photo)}
              >
                <img
                  src={`http://localhost:3000${photo.url}`}
                  alt="weather related"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <p>{photo.description}</p>
                <button
                  className={`like-button ${
                    likedPhotos.some((likedPhoto) => likedPhoto.id === photo.id)
                      ? "liked"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(photo);
                  }}
                >
                  ❤
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedPhoto && (
        <div className="popup" onClick={handleClosePopup}>
          <div className="popup-content">
            <img
              src={`http://localhost:3000${selectedPhoto.url}`}
              alt="Selected"
            />
            <p>{selectedPhoto.description}</p>
          </div>
        </div>
      )}
      {showLoginPrompt && (
        <div className="login-prompt-popup" onClick={handleCloseLoginPrompt}>
          <div className="login-prompt-content">
            <p>Please log in to like photos.</p>
            <button onClick={() => navigate("/login")}>Go to Login</button>
            <button onClick={handleCloseLoginPrompt}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
