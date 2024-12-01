// Import SVGs
import logoFacte from '../assets/logo-facte.svg';
import functionWheel from '../assets/FunctionWheel.svg';
import activites from '../assets/Activités.svg';
import timeline from '../assets/Timeline.svg';

// Map des SVG importés
export const svgMap = {
  '/src/assets/logo-facte.svg': logoFacte,
  '/src/assets/FunctionWheel.svg': functionWheel,
  '/src/assets/Activités.svg': activites,
  '/src/assets/Timeline.svg': timeline,
};

// Fonction utilitaire pour obtenir le bon chemin SVG
export const getSvgPath = (path: string) => svgMap[path] || path;
