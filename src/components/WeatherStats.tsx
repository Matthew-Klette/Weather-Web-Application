import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { RainAmount } from './RainAmount';

interface WeatherStatsProps {
  temperature: number;
  feelsLike: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
  rainAmount?: number;
  rainPeriod?: '1h' | '3h';
  compact?: boolean;
}

export function WeatherStats({
  temperature,
  feelsLike,
  windSpeed,
  humidity,
  pressure,
  rainAmount,
  rainPeriod,
  compact = false
}: WeatherStatsProps) {
  const iconSize = compact ? 16 : 20;
  
  return (
    <div className={`grid ${compact ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
      {!compact && (
        <div className="flex items-center gap-2 text-white/90">
          <Thermometer size={iconSize} />
          <span>Feels like: {Math.round(feelsLike)}°C</span>
        </div>
      )}
      <div className="flex items-center gap-2 text-white/90">
        <Wind size={iconSize} />
        <span>{windSpeed} m/s</span>
      </div>
      <div className="flex items-center gap-2 text-white/90">
        <Droplets size={iconSize} />
        <span>{humidity}%</span>
      </div>
      <div className="flex items-center gap-2 text-white/90">
        <Cloud size={iconSize} />
        <span>{pressure} hPa</span>
      </div>
      {rainAmount && (
        <div className="flex items-center gap-2 text-white/90">
          <RainAmount amount={rainAmount} period={rainPeriod} />
        </div>
      )}
    </div>
  );
}