import React from 'react';
import { Card } from './ui/Card';
import { SectionHeader } from './ui/SectionHeader';
import { InfoBox } from './ui/InfoBox';
import type { Activity } from '../utils/types';

interface ActivitiesProps {
  activities: Activity[];
}

export function Activities({ activities }: ActivitiesProps) {
  return (
    <Card>
      <SectionHeader icon="📋" title="EXEMPLES D'ACTIVITÉS" />
      
      <div className="relative">
        <div className="grid grid-cols-6 gap-6">
          {activities.map((activity, index) => (
            <div key={index} className="relative">
              <div className={`${activity.color} p-4 rounded-lg h-full flex flex-col`}>
                <div className="mb-4">
                  <h4 className="font-bold text-xs text-white uppercase mb-1">{activity.category}</h4>
                  <div className="text-white">
                    <p className="font-bold text-sm leading-tight mb-2">{activity.title}</p>
                    <p className="text-xs opacity-90 leading-tight">{activity.description}</p>
                  </div>
                </div>
                
                {activity.logos && (
                  <div className="mt-auto pt-3 border-t border-white/20">
                    <div className="flex flex-wrap gap-2">
                      {activity.logos.map((logo, idx) => (
                        <img 
                          key={idx}
                          src={logo}
                          alt="Logo partenaire"
                          className="w-8 h-8 object-contain bg-white rounded-sm p-1"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {index < activities.length - 1 && (
                <div className="absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200 transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <InfoBox>
        Une majorité des activités est au carrefour de toutes les fonctions. Les projets d'innovation, les techniques d'animation,
        l'accompagnement sont dans l'ensemble associés et validés tout au long de leur développement.
      </InfoBox>
    </Card>
  );
}