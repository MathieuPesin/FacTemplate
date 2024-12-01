import React, { useEffect, useState, useRef } from 'react';
import { TemplateData } from '../types/template-data';
import exampleData from '../data/example-data.json';
import html2pdf from 'html2pdf.js';

const FACTEPage = () => {
  const [data, setData] = useState<TemplateData>(exampleData as TemplateData);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('templateData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleDownloadPDF = () => {
    const content = contentRef.current;
    if (!content) return;

    const opt = {
      filename: 'monographie.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: content.scrollWidth,
        windowHeight: content.scrollHeight
      },
      jsPDF: { 
        unit: 'px', 
        format: [content.scrollWidth, content.scrollHeight],
        orientation: 'portrait',
        hotfixes: ['px_scaling']
      },
      margin: 0
    };

    // Sauvegarde temporaire du style de fond
    const originalBg = document.body.style.background;
    document.body.style.background = 'white';

    html2pdf().set(opt).from(content).save().then(() => {
      // Restaure le style de fond
      document.body.style.background = originalBg;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Flottant avec bouton de téléchargement */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="/" className="hover:opacity-80 transition-opacity">
                <img src={data.header.logo} alt="Logo" className="h-14 w-auto" />
              </a>
            </div>
            
            <div className="flex items-center gap-8">
              {/* Navigation Design */}
              <nav>
                <ul className="flex gap-10">
                  {data.header.navigation.map((item, index) => {
                    // Correspondance exacte des IDs de section
                    const sectionMap: { [key: string]: string } = {
                      'Présentation': 'presentation',
                      'Fonctions': 'fonctions',
                      'Activité': 'activite',
                      'Feuille de route': 'timeline'
                    };
                    const targetId = sectionMap[item] || item.toLowerCase();

                    return (
                      <li key={index}>
                        <a
                          href={`#${targetId}`}
                          className="text-gray-600 hover:text-gray-900 font-medium relative group transition-colors duration-300"
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById(targetId);
                            if (element) {
                              element.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                              });
                            }
                          }}
                        >
                          {item}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bouton de téléchargement */}
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Télécharger PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div ref={contentRef} className="max-w-6xl mx-auto space-y-16">
          {/* Section Présentation */}
          <section id="presentation" className="space-y-12">
            {/* En-tête avec effet parallaxe */}
            <div className="text-center space-y-6">
              {/* Titre principal avec grand style */}
              <div className="relative">
                <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-blue-600 via-blue-400 to-emerald-400 transform rotate-6"></div>
                <div className="relative space-y-6">
                  <h1 className="text-6xl font-extrabold tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 animate-gradient">
                      Monographie
                    </span>
                  </h1>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold text-gray-800">
                      {data.presentation.title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      {data.presentation.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Métriques en grille moderne */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.presentation.keyMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, white, ${metric.bgColor})`
                  }}
                >
                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                  
                  <div className="relative flex flex-col items-center text-center space-y-6">
                    <div 
                      className="p-4 rounded-xl transform group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${metric.color}20` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={metric.color}
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={metric.icon} />
                      </svg>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {metric.title}
                      </h3>
                      <p 
                        className="text-3xl font-bold transition-all duration-300 group-hover:scale-110"
                        style={{ color: metric.color }}
                      >
                        {metric.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mission et Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="group relative bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Effet de fond animé */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{data.presentation.mission.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {data.presentation.mission.description}
                  </p>
                </div>
              </div>

              {/* Actions Environnementales */}
              <div className="group relative bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Effet de fond animé */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {data.presentation.environmentalActions.title}
                    </h3>
                  </div>
                  <ul className="space-y-5">
                    {data.presentation.environmentalActions.actions.map((action, index) => (
                      <li key={index} className="flex items-start space-x-4 group/item">
                        <div className="flex-shrink-0 p-1">
                          <svg
                            className="w-6 h-6 text-emerald-500 transform group-hover/item:scale-125 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-600 text-lg leading-relaxed group-hover/item:text-gray-900 transition-colors">
                          {action}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section Fonctions */}
          <section id="fonctions" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">{data.functions.title}</h2>
              <p className="text-xl text-gray-600">{data.functions.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Roue des fonctions (3 colonnes) */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transform hover:-translate-y-2 transition-all duration-500">
                <img src={data.functions.wheel.svgPath} alt="Roue des fonctions" className="w-full hover:scale-105 transition-transform duration-500" />
              </div>

              {/* Détails des fonctions (2 colonnes) */}
              <div className="lg:col-span-2 space-y-6">
                {data.functions.wheel.sections.map((section, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.2)] transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      {/* Titre de la section */}
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: section.color }}
                        />
                        <h3 className="text-xl font-bold text-gray-900">
                          {section.title}
                        </h3>
                      </div>

                      {/* Liste des items */}
                      <div className="space-y-4">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">{item.text}</span>
                              <span className="font-medium" style={{ color: section.color }}>
                                {item.percentage}%
                              </span>
                            </div>
                            {/* Barre de progression */}
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div
                                className="h-1.5 rounded-full transition-all duration-500"
                                style={{
                                  width: `${item.percentage}%`,
                                  backgroundColor: section.color
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {data.functions.description && (
              <p className="text-lg text-gray-600 text-center mt-8 italic">{data.functions.description}</p>
            )}
          </section>

          {/* Section Activité */}
          <section id="activite" className="space-y-8">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">{data.activities.title}</h2>
              <p className="text-xl text-gray-600">{data.activities.subtitle}</p>
            </div>
            <div className="bg-white rounded-2xl p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transform hover:-translate-y-2 transition-all duration-500">
              <img src={data.activities.visualization.svgPath} alt="Activités" className="w-full max-w-4xl mx-auto hover:scale-105 transition-transform duration-500" />
              {data.activities.description && (
                <p className="text-lg text-gray-600 text-center mt-8 italic">{data.activities.description}</p>
              )}
            </div>
          </section>

          {/* Section Timeline */}
          <section id="timeline" className="space-y-8">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">{data.timeline.title}</h2>
              <p className="text-xl text-gray-600">{data.timeline.subtitle}</p>
            </div>
            <div className="bg-white rounded-2xl p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transform hover:-translate-y-2 transition-all duration-500">
              <img src={data.timeline.visualization.svgPath} alt="Feuille de route" className="w-full max-w-5xl mx-auto hover:scale-105 transition-transform duration-500" />
              {data.timeline.description && (
                <p className="text-lg text-gray-600 text-center mt-8 italic">{data.timeline.description}</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FACTEPage;
