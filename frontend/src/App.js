// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import JobPostingForm from './components/JobPostingForm';
import JobListing from './components/JobListing';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/create-job" element={<JobPostingForm />} />
        <Route path="/apply-jobs" element={<JobListing />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
