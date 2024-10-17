import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Modal, Button } from '@mui/material';
import ApplicationDetails from './ApplicationDetails'; 

const JobApplicationsList = () => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/job-applications/'); // API URL
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleViewApplicationClick = (application) => {
    setSelectedApplication(application); 
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedApplication(null); 
  };

  const handleDeleteApplication = async (applicationId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");

    if(confirmDelete) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/applications/${applicationId}/delete/`, {
          method: 'DELETE',
        });
        if(!response.ok) {
          throw new Error('Failed to delete job');
        }
         setApplications(applications.filter(application => application.id !== applicationId));
      } catch(error) {
        console.error('Error deleting application:', error);
      }
     
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h3" color="error" sx={{ display: 'flex', justifyContent:  'center', alignItems: 'center', height: '100vh', textAlign: 'center', marginTop: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h3" component="h2" sx={{ mb: 4, marginTop: 8, color: 'rgba(25, 118, 210)', fontWeight: 'bold' }}>
        JOB APPLICATIONS
      </Typography>
      {applications.map((application) => (
        <Card
          
          key={application.id}
          sx={{
            width: '80%',
            margin: 2,
            boxShadow: 3,
            padding: 1,
            paddingBottom: 1,
            borderRadius: 2,
            transition: '0.3s',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: 6,
            },
          }}
         
        >
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {application.full_name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {application.email} - {application.education}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Experience: {application.experience} years
            </Typography>
            <Button color='primary' size='small' sx={{ marginRight: 2, marginTop: 2, }}variant='contained' onClick={() => handleViewApplicationClick(application)} >View Application</Button>
            <Button
            variant='contained'
            size='small'
            color='error'
            sx={{
              marginTop: 2,
            }}
            onClick={() => handleDeleteApplication(application.id)}>
              Delete Application
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Modal for Application Details */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ 
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
            maxWidth: '600px'
        }}>
          {selectedApplication && <ApplicationDetails application={selectedApplication} onClose={handleClose} />}
        </Box>
      </Modal>
    </Box>
  );
};

export default JobApplicationsList;
