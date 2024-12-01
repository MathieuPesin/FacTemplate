import React from 'react';

interface SectionHeaderProps {
  icon: string;
  title: string;
}

export function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="section-icon">
        <span>{icon}</span>
      </div>
      <h3 className="section-title">{title}</h3>
    </div>
  );
}