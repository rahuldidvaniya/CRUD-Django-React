import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';

const jobTypes = [
  { value: 'FT', label: 'Full-time' },
  { value: 'PT', label: 'Part-time' },
  { value: 'CT', label: 'Contract' },
  { value: 'IN', label: 'Internship' },
];

const EditJobModal = ({ open, onClose, job, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setJobType(job.job_type);
      setLocation(job.location);
      setCompanyName(job.company_name);
      setSalary(job.salary);
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      job_type: jobType,
      location,
      company_name: companyName,
      salary,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/job/${job.id}/edit/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
          backgroundColor: 'white',
          width: '80%',
          maxHeight: '80vh', // Set max height
          borderRadius: 1,
          overflowY: 'auto', // Enable vertical scroll if content overflows
          boxShadow: 24, // Add a shadow for a better look
          outline: 'none', // Remove default outline
        }}
      >
        <TextField
          label="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <TextField
          label="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          required
        />
        <TextField
          select
          label="Job Type"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          required
        >
          {jobTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <TextField
          label="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditJobModal;
