// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import JobPostingForm from './components/JobPostingForm';
import JobListing from './components/JobListing';
import JobApplicationsList from './components/JobApplicationList';
import SignUpForm from './components/SignUpForm';

const App = () => {
  return (
    <Router>
      <Header />
     

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/create-job" element={<JobPostingForm />} />
        <Route path="/apply-jobs" element={<JobListing />} />
        <Route path="/jobs-applications" element={<JobApplicationsList />} />
        <Route path="/sign-up" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
};

export default App;
