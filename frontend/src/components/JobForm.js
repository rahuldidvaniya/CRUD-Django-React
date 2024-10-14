import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
  CircularProgress,
  Modal,
} from '@mui/material';

const JobForm = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    job: job.id,
    full_name: '',
    email: '',
    education: '',
    experience: '',
    cover_letter: '',
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/job-application/', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      alert('Application submitted successfully!');
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, 
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 3, 
          outline: 'none',
          overflowY: 'auto'
        }}
      >
         <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', backgroundColor: '#007BFF', padding: 2, borderRadius: 1 }}
      >
        Job Application
      </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Applying for: <strong>{job.title}</strong> at <strong>{job.company_name}</strong>
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          required
          fullWidth
          label="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          sx={{ mb: 1 }}
        />
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          label="Education"
          name="education"
          multiline
          rows={1}
          value={formData.education}
          onChange={handleChange}
          sx={{ mb: 1 }}
        />
       <TextField
  fullWidth
  label="Experience"
  name="experience"
  type="number"  // Set type to number
  value={formData.experience}
  onChange={handleChange}
  inputProps={{ min: 0, step: 0.1 }}  // Set min to 0 and step to 0.1
  sx={{ mb: 1 }}
/>

        <TextField
          fullWidth
          label="Cover Letter"
          name="cover_letter"
          multiline
          rows={2}
          value={formData.cover_letter}
          onChange={handleChange}
          sx={{ mb: 1 }}
        />
        <FormControl fullWidth sx={{ mb: 1 }}>
         
          <input
            accept="application/pdf"
            id="resume"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="resume">
            <Button variant="contained" component="span">
              Upload Resume
            </Button>
          </label>
          {formData.resume && (
            <FormHelperText>{formData.resume.name}</FormHelperText>
          )}
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit Application'}
        </Button>
        <Button onClick={onClose} variant="outlined" fullWidth sx={{ mt: 1 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default JobForm;
