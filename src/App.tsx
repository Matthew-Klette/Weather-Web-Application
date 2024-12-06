import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { fetchWeather, fetchForecast } from './utils/weather';
import type { WeatherData, ForecastData } from './types/weather';
import { CloudRain } from 'lucide-react';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError('');
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center p-8 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
      
      <div className="backdrop-blur-sm bg-white/20 p-8 rounded-2xl w-full max-w-md mb-8 border border-white/20 shadow-xl relative">
        <div className="flex items-center justify-center gap-2 mb-6">
          <CloudRain size={32} className="text-white" />
          <h1 className="text-3xl font-bold text-white">Weather App</h1>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && (
        <div className="text-white text-lg font-medium backdrop-blur-sm bg-black/20 px-6 py-3 rounded-lg">
          Loading...
        </div>
      )}

      {error && (
        <div className="backdrop-blur-sm bg-red-500/20 text-white border border-red-300/20 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-8 w-full flex flex-col items-center">
        {weather && <WeatherCard data={weather} />}
        {forecast && (
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">3-Day Forecast</h2>
            <ForecastCard forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;