import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TemplateData } from '../types/template-data';
import exampleData from '../data/example-data.json';
import functionWheel from '../assets/FunctionWheel.svg';
import activites from '../assets/Activités.svg';
import timeline from '../assets/Timeline.svg';

interface CustomImages {
  functionWheel?: File;
  activities?: File;
  timeline?: File;
}

const HomePage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customImages, setCustomImages] = useState<CustomImages>({});
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateJson = (json: any): json is TemplateData => {
    const requiredSections = ['header', 'presentation', 'functions', 'activities', 'timeline', 'theme'];
    return requiredSections.every(section => json && typeof json[section] === 'object');
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      setError('Veuillez déposer un fichier JSON');
      return;
    }

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      if (!validateJson(json)) {
        setError('Le fichier JSON ne correspond pas à la structure attendue');
        return;
      }

      // Modifier le JSON avec les URLs des images personnalisées
      if (customImages.functionWheel) {
        json.functions.wheel.svgPath = URL.createObjectURL(customImages.functionWheel);
      }
      if (customImages.activities) {
        json.activities.visualization.svgPath = URL.createObjectURL(customImages.activities);
      }
      if (customImages.timeline) {
        json.timeline.visualization.svgPath = URL.createObjectURL(customImages.timeline);
      }

      localStorage.setItem('templateData', JSON.stringify(json));
      localStorage.setItem('customImages', JSON.stringify({
        functionWheel: customImages.functionWheel ? URL.createObjectURL(customImages.functionWheel) : null,
        activities: customImages.activities ? URL.createObjectURL(customImages.activities) : null,
        timeline: customImages.timeline ? URL.createObjectURL(customImages.timeline) : null,
      }));

      navigate('/facte');
    } catch (err) {
      setError('Erreur lors de la lecture du fichier JSON');
    }
  }, [navigate, customImages]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const event = new DragEvent('drop', { dataTransfer: new DataTransfer() });
    event.dataTransfer?.items.add(file);
    handleDrop(event as unknown as React.DragEvent<HTMLDivElement>);
  }, [handleDrop]);

  const handleImageUpload = (type: keyof CustomImages) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    const validTypes = ['image/svg+xml', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Format d\'image non supporté. Utilisez SVG, JPG ou PNG');
      return;
    }

    setCustomImages(prev => ({
      ...prev,
      [type]: file
    }));
    setError(null);
  };

  const handleDownloadExample = () => {
    const jsonString = JSON.stringify(exampleData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template-facte.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Template FACTE
          </h1>
          <p className="text-lg text-gray-600">
            Personnalisez votre template et déposez votre fichier JSON
          </p>
        </div>

        {/* Section des visuels */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            Visuels
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Roue des fonctions */}
            <div className="space-y-4">
              <label className="block cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".svg,.jpg,.jpeg,.png"
                  onChange={handleImageUpload('functionWheel')}
                />
                <div className="aspect-square bg-gray-50 rounded-lg p-4 flex items-center justify-center group hover:bg-gray-100 transition-colors duration-300">
                  <img
                    src={customImages.functionWheel ? URL.createObjectURL(customImages.functionWheel) : functionWheel}
                    alt="Roue des fonctions"
                    className="max-w-full max-h-full object-contain group-hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
              </label>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Roue des fonctions</span>
                <label className="text-gray-500 hover:text-gray-700 text-sm font-medium cursor-pointer">
                  Remplacer
                  <input
                    type="file"
                    className="hidden"
                    accept=".svg,.jpg,.jpeg,.png"
                    onChange={handleImageUpload('functionWheel')}
                  />
                </label>
              </div>
            </div>

            {/* Activités */}
            <div className="space-y-4">
              <label className="block cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".svg,.jpg,.jpeg,.png"
                  onChange={handleImageUpload('activities')}
                />
                <div className="aspect-square bg-gray-50 rounded-lg p-4 flex items-center justify-center group hover:bg-gray-100 transition-colors duration-300">
                  <img
                    src={customImages.activities ? URL.createObjectURL(customImages.activities) : activites}
                    alt="Activités"
                    className="max-w-full max-h-full object-contain group-hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
              </label>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Activités</span>
                <label className="text-gray-500 hover:text-gray-700 text-sm font-medium cursor-pointer">
                  Remplacer
                  <input
                    type="file"
                    className="hidden"
                    accept=".svg,.jpg,.jpeg,.png"
                    onChange={handleImageUpload('activities')}
                  />
                </label>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <label className="block cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".svg,.jpg,.jpeg,.png"
                  onChange={handleImageUpload('timeline')}
                />
                <div className="aspect-square bg-gray-50 rounded-lg p-4 flex items-center justify-center group hover:bg-gray-100 transition-colors duration-300">
                  <img
                    src={customImages.timeline ? URL.createObjectURL(customImages.timeline) : timeline}
                    alt="Feuille de route"
                    className="max-w-full max-h-full object-contain group-hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
              </label>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Feuille de route</span>
                <label className="text-gray-500 hover:text-gray-700 text-sm font-medium cursor-pointer">
                  Remplacer
                  <input
                    type="file"
                    className="hidden"
                    accept=".svg,.jpg,.jpeg,.png"
                    onChange={handleImageUpload('timeline')}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Zone de dépôt JSON */}
        <div
          className={`
            border-4 border-dashed rounded-lg p-12 text-center
            transition-colors duration-300 cursor-pointer
            ${isDragging ? 'border-gray-500 bg-gray-100' : 'border-gray-300 hover:border-gray-400'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept=".json"
            onChange={handleFileSelect}
          />

          <div className="space-y-4">
            <div className="flex justify-center">
              <svg
                className={`w-16 h-16 ${isDragging ? 'text-gray-500' : 'text-gray-400'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            <div className="text-lg">
              {isDragging ? (
                <span className="text-gray-500 font-medium">Déposez votre fichier ici</span>
              ) : (
                <span className="text-gray-500">
                  Glissez-déposez votre fichier JSON ici ou cliquez pour sélectionner
                </span>
              )}
            </div>

            {error && (
              <div className="text-red-500 font-medium mt-4">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Accordéon Télécharger des exemples */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden text-sm mt-12">
          <button
            className="w-full px-4 py-2 flex items-center justify-between text-left focus:outline-none hover:bg-gray-50"
            onClick={() => setIsExamplesOpen(!isExamplesOpen)}
          >
            <span className="text-gray-600 font-medium">
              Télécharger des exemples
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${
                isExamplesOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExamplesOpen && (
            <div className="px-4 py-3 bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Modèle JSON */}
                <button
                  onClick={handleDownloadExample}
                  className="flex items-center justify-between p-2 rounded bg-white border border-gray-200 hover:border-gray-400 hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 text-sm">JSON</span>
                  </div>
                </button>

                {/* Function Wheel */}
                <button
                  onClick={() => handleDownloadImage(functionWheel, 'function-wheel.svg')}
                  className="flex items-center justify-between p-2 rounded bg-white border border-gray-200 hover:border-gray-400 hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 text-sm">Fonctions</span>
                  </div>
                </button>

                {/* Activités */}
                <button
                  onClick={() => handleDownloadImage(activites, 'activites.svg')}
                  className="flex items-center justify-between p-2 rounded bg-white border border-gray-200 hover:border-gray-400 hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 text-sm">Activités</span>
                  </div>
                </button>

                {/* Timeline */}
                <button
                  onClick={() => handleDownloadImage(timeline, 'timeline.svg')}
                  className="flex items-center justify-between p-2 rounded bg-white border border-gray-200 hover:border-gray-400 hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 text-sm">Feuille de route</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
