import React from 'react';
import { Card } from './ui/Card';
import { SectionHeader } from './ui/SectionHeader';

interface MissionProps {
  content: string;
}

export function Mission({ content }: MissionProps) {
  return (
    <Card>
      <SectionHeader icon="🎯" title="MISSION" />
      <p className="text-[#4A5568] leading-relaxed text-lg">{content}</p>
    </Card>
  );
}