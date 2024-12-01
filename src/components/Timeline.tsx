import React from 'react';

interface TimelineEvent {
  year: string;
  events: {
    category: string;
    description: string;
  }[];
}

interface TimelineProps {
  events: TimelineEvent[];
}

const categoryColors: Record<string, string> = {
  'PLAIDOYER': 'bg-[#3B82F6]',
  'MISE EN RESEAU': 'bg-[#4B5563]',
  'INGENIERIE': 'bg-[#EAB308]',
  'PILOTAGE': 'bg-[#9333EA]',
  'ACCOMPAGNEMENT': 'bg-[#22C55E]',
  'FONCTION': 'bg-[#EC4899]'
};

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#F3F9F7] flex items-center justify-center">
            <span className="text-[#2B3F6C] text-xl">📅</span>
          </div>
          <h3 className="text-xl font-bold text-[#2B3F6C]">EVOLUTION</h3>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-[768px]">
            <div className="grid grid-cols-[120px_1fr] gap-8">
              <div className="pt-2">
                <h4 className="text-sm font-medium text-[#4A5568] mb-4">à l'échelle nationale</h4>
              </div>
              
              <div className="grid grid-cols-6 gap-4 mb-8">
                {Object.entries(categoryColors).map(([category]) => (
                  <div key={category} className="text-center">
                    <span className="text-xs font-medium text-[#4A5568] uppercase">{category}</span>
                  </div>
                ))}
              </div>
              
              {events.map((timeEvent, index) => (
                <React.Fragment key={timeEvent.year}>
                  <div className="text-right">
                    <span className="inline-block w-16 py-1 px-2 bg-[#F3F9F7] rounded text-sm font-bold text-[#2B3F6C]">
                      {timeEvent.year}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-4">
                    {Object.entries(categoryColors).map(([category, color]) => (
                      <div key={category} className="flex flex-col items-center">
                        <div 
                          className={`w-3 h-3 rounded-full ${
                            timeEvent.events.some(e => e.category === category) 
                              ? color 
                              : 'bg-white border-2 border-gray-200'
                          }`} 
                        />
                        {index < events.length - 1 && (
                          <div 
                            className={`h-12 w-0.5 ${
                              timeEvent.events.some(e => e.category === category)
                                ? color
                                : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[#F8FAFC] rounded-lg">
          <p className="text-sm text-[#4A5568] leading-relaxed">
            L'animation et la mise en réseau ont été l'objet central de la création d'Animafac. 
            La réflexion de plaidoyer sur les enjeux de la vie étudiante a été centrale dès 1996, 
            pour mieux légitimer les acteurs universitaires que les associations étudiantes sont devenues aujourd'hui.
          </p>
        </div>
      </div>
    </div>
  );
}