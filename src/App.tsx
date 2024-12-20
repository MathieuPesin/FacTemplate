import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FACTEPage from './components/FACTEPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/facte" element={<FACTEPage />} />
    </Routes>
  );
}

export default App;