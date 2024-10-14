// JobApplyModal.js
import React, { useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';

const JobApplyModal = ({ open, onClose, job }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      full_name: fullName,
      email,
      cover_letter: coverLetter,
      job_id: job.id,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/apply/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to apply for the job');
      }

      onClose(); 
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          backgroundColor: 'white',
          borderRadius: 2,
          outline: 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '600px',
          gap: 2,
        }}
      >
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Application
        </Button>
      </Box>
    </Modal>
  );
};

export default JobApplyModal;
