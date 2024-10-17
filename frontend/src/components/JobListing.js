import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CardActions, Button, CircularProgress, Modal } from '@mui/material';
import JobForm from './JobForm';
import EditJobModal from './EditJobModal'; 

const jobTypeMapping = {
  'FT': 'Full-time',
  'PT': 'Part-time',
  'CT': 'Contract',
  'IN': 'Internship'
};

const formatSalary = (salary) => {
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(salary);
};

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); 

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/job/');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const dataString = await response.json();
      console.log('Fetched data string:', dataString); 

      const data = JSON.parse(dataString); 

      if (Array.isArray(data)) {
          setJobs(data);
      } else {
          console.warn('Expected an array, received:', data);
          setJobs([]); 
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(); 
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setOpenApplyModal(true);
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setOpenEditModal(true); 
  };

  const handleCloseApplyModal = () => {
    setOpenApplyModal(false);
    setSelectedJob(null);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedJob(null);
  };

  const handleSaveJobEdit = async () => {
    await fetchJobs(); 
  };

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/job/${jobId}/delete/`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete job');
        }
      
        setJobs(jobs.filter(job => job.id !== jobId));
      } catch (error) {
        console.error('Error deleting job:', error);
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
      <Typography variant="h3" color="error" sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center', height: '100vh', alignItems: 'center', marginTop: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, marginTop: 7, fontWeight: 'bold', color: 'rgba(25, 118, 210)' }}>
        RECOMMENDED JOBS FOR YOU 
      </Typography>
  
      {jobs.length === 0 ? (
        <Typography variant="h5" sx={{ mt: 4, color: 'gray', textAlign: 'center' }}>
          No jobs available at the moment. Please check back later.
        </Typography>
      ) : (
        jobs.map((job) => (
          <Card
            key={job.id}
            sx={{
              width: '80%',
              margin: 2,
              boxShadow: 3,
              padding: 2,
              borderRadius: 2,
              transition: '0.3s',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {job.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {job.company_name} - {jobTypeMapping[job.job_type] || job.job_type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.description}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Location: {job.location}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Salary: ₹{formatSalary(job.salary)} CTC
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary" onClick={() => handleApplyClick(job)}>
                Apply Now
              </Button>
              <Button size="small" variant="contained" color="warning" onClick={() => handleEditClick(job)}>
                Edit Job Details
              </Button>
              <Button size="small" variant="contained" color="error" onClick={() => handleDeleteJob(job.id)}>
                Delete Job
              </Button>
            </CardActions>
          </Card>
        ))
      )}
  
      <Modal open={openApplyModal} onClose={handleCloseApplyModal}>
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
          {selectedJob && <JobForm job={selectedJob} onClose={handleCloseApplyModal} />}
        </Box>
      </Modal>
  
      <EditJobModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        job={selectedJob}
        onSave={handleSaveJobEdit}
      />
    </Box>
  );
  
};

export default JobListing;
