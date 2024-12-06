import React from 'react';
import type { WeatherData } from '../types/weather';
import { WeatherStats } from './WeatherStats';

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const rainAmount = data.rain?.['1h'] || data.rain?.['3h'];
  const rainPeriod = data.rain?.['1h'] ? '1h' : '3h';

  return (
    <div className="backdrop-blur-md bg-white/30 rounded-xl shadow-lg p-6 w-full max-w-md border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{data.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-16 h-16"
        />
      </div>

      <div className="mb-6">
        <div className="text-5xl font-bold text-white mb-2">
          {Math.round(data.main.temp)}°C
        </div>
        <p className="text-white/90 capitalize">{data.weather[0].description}</p>
      </div>

      <WeatherStats
        temperature={data.main.temp}
        feelsLike={data.main.feels_like}
        windSpeed={data.wind.speed}
        humidity={data.main.humidity}
        pressure={data.main.pressure}
        rainAmount={rainAmount}
        rainPeriod={rainPeriod}
      />
    </div>
  );
}