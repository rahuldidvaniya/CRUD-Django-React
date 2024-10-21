import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
const ApplicationDetails = ({ application, onClose }) => {
  const handleDownloadResume = async () => {
    if (application.resume_path) {
      try {
        const response = await axios.get(`${BASE_URL}/media/${application.resume_path}/`, {
          responseType: 'blob',
        });
        
        const contentDisposition = response.headers['content-disposition'];
        let filename = 'resume.pdf';
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
          if (filenameMatch.length === 2)
            filename = filenameMatch[1];
        }

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading the resume:", error);
        alert("Failed to download the resume. Please try again later.");
      }
    } else {
      alert("Resume is not available for this application.");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {application.full_name}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {application.email}
      </Typography>
      <Typography variant="body1">
        <strong>Education:</strong> {application.education}
      </Typography>
      <Typography variant="body1">
        <strong>Experience:</strong> {application.experience} YOE
      </Typography>
      <Typography variant="body1">
        <strong>Cover Letter:</strong> {application.cover_letter}
      </Typography>
      {application.resume_path && (
        <Button variant="contained" color="primary" onClick={handleDownloadResume}>
          Download Resume
        </Button>
      )}
      <Button variant="outlined" color="primary" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default ApplicationDetails;