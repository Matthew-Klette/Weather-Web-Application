import React from 'react';
import { CloudRain } from 'lucide-react';

interface RainAmountProps {
  amount?: number;
  period?: '1h' | '3h';
}

export function RainAmount({ amount, period = '3h' }: RainAmountProps) {
  if (!amount) return null;

  return (
    <div className="flex items-center gap-2 text-white/90">
      <CloudRain size={20} />
      <span>{amount.toFixed(1)} mm{period && `/${period}`}</span>
    </div>
  );
}