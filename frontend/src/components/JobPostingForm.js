import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JobPostingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [job_type, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [salary, setSalary] = useState(''); 
  const [logo, setLogo] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('job_type', job_type);
    formData.append('location', location);
    formData.append('company_name', company_name);
    formData.append('salary', salary);
    
   
    if (logo) {
        formData.append('logo', logo);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/job/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        navigate('/');        
      } else {
        const errorData = await response.json(); 
        console.error('Failed to create job posting:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        boxShadow: 3,
        marginTop: 10,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', backgroundColor: '#007BFF', padding: 2, borderRadius: 1 }}
      >
        Create Job Posting
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
        <TextField
          fullWidth
          label="Job Title"
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={4}
        />
        <FormControl fullWidth variant="outlined" margin="normal" required>
          <InputLabel>Job Type</InputLabel>
          <Select
            value={job_type}
            onChange={(e) => setJobType(e.target.value)}
            label="Job Type"
          >
            <MenuItem value="FT">Full-time</MenuItem>
            <MenuItem value="PT">Part-time</MenuItem>
            <MenuItem value="IN">Internship</MenuItem>
            <MenuItem value="CT">Contract</MenuItem>
            <MenuItem value="FL">Freelance</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Company Name"
          variant="outlined"
          margin="normal"
          value={company_name}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <FormControl fullWidth sx={{ mb: 1 }}>
          <input
            accept="image/*"
            id="logo"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="logo">
            <Button variant="contained" component="span">
              Upload Company Logo
            </Button>
          </label>
          {logo && (
            <FormHelperText>{logo.name}</FormHelperText>
          )}
        </FormControl>
        <TextField
          fullWidth
          label="Salary"
          variant="outlined"
          margin="normal"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          type="number"
          inputProps={{ min: 0 }}  
        />

        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
          Submit Job Posting
        </Button>
      </form>
    </Box>
  );
};

export default JobPostingForm;
