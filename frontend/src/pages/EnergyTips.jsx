import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../utils/api';

const EnergyTips = () => {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [tips, setTips] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getWeatherTips(city);
      
      if (response.success) {
        setWeather(response.weather);
        setTips(response.tips);
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check if the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      'clear': '☀️',
      'clouds': '☁️',
      'rain': '🌧️',
      'snow': '❄️',
      'thunderstorm': '⛈️',
      'drizzle': '🌦️',
      'mist': '🌫️',
    };
    return icons[condition?.toLowerCase()] || '🌤️';
  };

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="section-title">Energy Tips & Weather</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get sustainable outfit recommendations based on real-time weather conditions
          </p>
        </motion.div>

        {/* City Search */}
        <div className="card mb-6">
          <form onSubmit={handleFetchWeather} className="flex space-x-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="input-field flex-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !city.trim()}
              className="btn-primary disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Get Weather Tips'}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg p-3 text-sm">
              ⚠️ {error}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="card flex flex-col items-center justify-center py-12">
            <div className="spinner mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Fetching weather data...</p>
          </div>
        ) : weather && tips ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Weather Card */}
            <div className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{weather.city}</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 capitalize">
                    {weather.description}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-2">{getWeatherIcon(weather.condition)}</div>
                  <div className="text-4xl font-bold">{weather.temperature}°C</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Feels like {weather.feels_like}°C
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div className="text-2xl mb-1">💧</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Humidity</div>
                  <div className="text-xl font-bold">{weather.humidity}%</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div className="text-2xl mb-1">💨</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</div>
                  <div className="text-xl font-bold">{weather.wind_speed} km/h</div>
                </div>
              </div>
            </div>

            {/* Outfit Suggestions */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Recommended Outfits</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tips.outfit_suggestions.map((outfit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-2xl">👕</span>
                    <span className="text-gray-700 dark:text-gray-300">{outfit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Fabric Recommendations */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Recommended Fabrics</h2>
              <div className="flex flex-wrap gap-3">
                {tips.fabric_recommendations.map((fabric) => (
                  <span
                    key={fabric}
                    className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-200 rounded-full font-medium"
                  >
                    {fabric}
                  </span>
                ))}
              </div>
            </div>

            {/* Accessories */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Essential Accessories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tips.accessories.map((accessory, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-xl">🎒</span>
                    <span className="text-gray-700 dark:text-gray-300">{accessory}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sustainability Tip */}
            <div className="card bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <h2 className="text-2xl font-bold mb-3 flex items-center">
                <span className="mr-2">🌱</span>
                Sustainability Tip
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {tips.sustainability_tip}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="card flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
            <div className="text-8xl mb-4">🌤️</div>
            <p className="text-xl">Enter a city to get weather-based outfit recommendations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnergyTips;
