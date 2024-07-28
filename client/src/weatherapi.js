export const fetchWeather = async (city) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/weather/${encodeURIComponent(city)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
