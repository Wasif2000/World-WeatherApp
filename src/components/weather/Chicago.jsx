import React, { useState, useEffect } from 'react';

const Chicago = () => {
  const [city, setCity] = useState('Chicago');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const apiKey = '355a77fec62e422bba1103052242609';  // Your API Key

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Weather App</h1>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Enter City:</label>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          className="px-4 py-2 border rounded-md shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={fetchWeather}
          className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get Weather
        </button>
      </div>

      {loading && <p className="text-lg font-semibold text-blue-500">Loading...</p>}
      {error && <p className="text-lg font-semibold text-red-500">Error: {error}</p>}

      {weather && (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Weather in {weather.location.name}, {weather.location.country}
          </h2>
          <p className="text-lg font-semibold">Temperature: {weather.current.temp_c}°C</p>
          <p className="text-lg">Condition: {weather.current.condition.text}</p>
          <p className="text-lg">Humidity: {weather.current.humidity}%</p>
          <p className="text-lg">Wind Speed: {weather.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
};

export default Chicago;
