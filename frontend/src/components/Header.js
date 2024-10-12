import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
      <Typography
      variant="h6"
      component={Link}
      to={'/'}
      sx={{
        flexGrow: 1,
        color: 'white', // Set color to white
        textDecoration: 'none', // Remove underline from link
        fontWeight: 'bold',
        fontSize: 22,
     
      }}
    >
      ApplyNow
    </Typography>
        <Button component={Link} to={"/create-job"} color="inherit">Create Job Posting</Button>
        <Button component={Link} to={"/apply-jobs"} color="inherit">Apply Jobs</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
