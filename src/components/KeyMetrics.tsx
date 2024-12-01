import React from 'react';

interface Metric {
  value: string;
  label: string;
}

interface KeyMetricsProps {
  metrics: Metric[];
  year: string;
}

export function KeyMetrics({ metrics, year }: KeyMetricsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-8">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EBF3FB]">
            <span className="text-sm text-[#4A5568]">Créé en</span>
            <span className="ml-2 font-bold text-[#2B3F6C]">{year}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-[#2B3F6C] mb-2">{metric.value}</div>
              <div className="text-sm text-[#4A5568] leading-tight">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}