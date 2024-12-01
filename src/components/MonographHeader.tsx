import React from 'react';

interface MonographHeaderProps {
  title: string;
  subtitle: string;
  number: string;
}

export function MonographHeader({ title, subtitle, number }: MonographHeaderProps) {
  return (
    <div className="bg-[#F3F9F7] rounded-t-lg overflow-hidden">
      <div className="p-8">
        <div className="flex items-start gap-8">
          <div className="flex-shrink-0">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="w-16 h-16"
            />
          </div>
          <div className="flex-grow">
            <div className="mb-8">
              <h1 className="text-[#4A5568] text-sm uppercase tracking-wider mb-1">Des monographies pour mieux comprendre</h1>
              <h2 className="text-[#2B3F6C] text-2xl font-bold">L'action des têtes de réseau associatif</h2>
            </div>
            <div className="flex items-baseline gap-4">
              <div className="text-[#4A5568] text-sm">
                Monographie n°<span className="text-[#E94E87] font-bold">{number}</span>
              </div>
              <div>
                <h3 className="text-[#E94E87] text-2xl font-bold">{title}</h3>
                <p className="text-[#4A5568] italic">{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}