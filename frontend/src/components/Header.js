import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <AppBar
      position="absolute" 
      sx={{ 
        backgroundColor: 'rgba(25, 118, 210, 0.7)',
        boxShadow: 'none',
        color: 'white', 
      }}
    >
      <Toolbar>
        <Typography
          className="logo"
          variant="p"
          component={Link}
          to={'/'}
          sx={{
            flexGrow: 1,
            color: 'white', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            fontSize: 22,
          }}
        >
          ApplyNow
        </Typography>
        <Button className='nav-link' component={Link} to={"/create-job"} sx={{ color: 'white' }}>
          Create Job Posting
        </Button>
        <Button className='nav-link' component={Link} to={"/apply-jobs"} sx={{ color: 'white' }}>
          Apply Jobs
        </Button>
        <Button className='nav-link' component={Link} to={"/jobs-applications"} sx={{ color: 'white' }}>
        View Job Applications
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
