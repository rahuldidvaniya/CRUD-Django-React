import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import heroImage from '../Images/hero-banner.jpg';
import '../styles/HeroSection.css'; 

const HeroSection = () => {
  return (
    <Box
      className="hero-section"
      sx={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="hero-overlay" /> {/* Add the overlay div */}

      <Typography className="hero-title" variant="h1">
        Welcome to ApplyNow
      </Typography>
      <Typography className="hero-subtitle" variant="h4">
        Find Your Dream Job or Post a New One
      </Typography>
      <Box className="hero-buttons">
        <Button
          variant="contained"
          className="hero-button-contained"
          component={Link}
          to="/create-job"
        >
          Create Job Posting
        </Button>
        <Button
          variant="contained"
          className="hero-button-contained"
          component={Link}
          to="/apply-jobs"
        >
          Apply Jobs
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
