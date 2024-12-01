import React from 'react';
import { Card } from './ui/Card';
import { SectionHeader } from './ui/SectionHeader';
import type { FunctionData } from '../utils/types';

interface FunctionProps {
  content: string;
  chartData: FunctionData[];
}

export function Functions({ content, chartData }: FunctionProps) {
  const totalPercentage = chartData.reduce((acc, item) => acc + item.percentage, 0);
  let currentRotation = 0;

  return (
    <Card>
      <SectionHeader icon="⚙️" title="FONCTIONS" />
      <p className="text-[#4A5568] leading-relaxed mb-12 max-w-3xl">{content}</p>
      
      <div className="flex gap-16 items-center">
        <div className="relative w-[240px] h-[240px] flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            {chartData.map((item, index) => {
              const degrees = (item.percentage / totalPercentage) * 360;
              const rotation = currentRotation;
              currentRotation += degrees;
              
              return (
                <circle
                  key={index}
                  cx="120"
                  cy="120"
                  r="60"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="120"
                  strokeDasharray={`${degrees} 360`}
                  transform={`rotate(${rotation} 120 120)`}
                />
              );
            })}
            <circle cx="120" cy="120" r="48" fill="white" />
          </svg>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }} />
              <div>
                <span className="text-sm font-medium text-[#2B3F6C]">{item.label}</span>
                <span className="ml-2 text-sm text-[#4A5568]">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}