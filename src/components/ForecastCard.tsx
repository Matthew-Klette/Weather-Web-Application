import React from 'react';
import { Calendar } from 'lucide-react';
import type { ForecastData } from '../types/weather';
import { WeatherStats } from './WeatherStats';

interface ForecastCardProps {
  forecast: ForecastData;
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  // Get one forecast per day at 12:00
  const dailyForecasts = forecast.list
    .filter(item => item.dt_txt.includes('12:00:00'))
    .slice(0, 3);

  return (
    <div className="w-full max-w-md space-y-4">
      {dailyForecasts.map((day) => {
        const rainAmount = day.rain?.['3h'];

        return (
          <div
            key={day.dt}
            className="backdrop-blur-md bg-white/30 rounded-xl shadow-lg p-6 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={20} className="text-white" />
              <span className="text-white font-medium">
                {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  className="w-16 h-16"
                />
                <div>
                  <div className="text-3xl font-bold text-white">
                    {Math.round(day.main.temp)}°C
                  </div>
                  <p className="text-white/90 capitalize">
                    {day.weather[0].description}
                  </p>
                </div>
              </div>
            </div>

            <WeatherStats
              temperature={day.main.temp}
              feelsLike={day.main.feels_like}
              windSpeed={day.wind.speed}
              humidity={day.main.humidity}
              pressure={day.main.pressure}
              rainAmount={rainAmount}
              rainPeriod="3h"
              compact={true}
            />
          </div>
        );
      })}
    </div>
  );
}