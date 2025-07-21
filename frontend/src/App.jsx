import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import VotePage from './pages/VotePage';
import ResultsPage from './pages/ResultsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/vote/:pollId" element={<VotePage />} />
            <Route path="/results/:pollId" element={<ResultsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;