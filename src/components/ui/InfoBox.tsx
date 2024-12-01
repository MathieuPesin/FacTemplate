import React, { ReactNode } from 'react';

interface InfoBoxProps {
  children: ReactNode;
}

export function InfoBox({ children }: InfoBoxProps) {
  return (
    <div className="mt-8 p-6 bg-[#F8FAFC] rounded-lg">
      <p className="text-sm text-[#4A5568] leading-relaxed">
        {children}
      </p>
    </div>
  );
}