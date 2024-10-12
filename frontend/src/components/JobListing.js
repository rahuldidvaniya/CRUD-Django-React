import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CardActions, Button, CircularProgress, Modal } from '@mui/material';
import JobForm from './JobForm'; 

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/job/');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
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
        // Remove the deleted job from the state
        setJobs(jobs.filter(job => job.id !== jobId));
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginTop: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, marginTop: 7, fontWeight: 'bold', color: 'rgba(25, 118, 210)'}}>
      Recommended jobs for you
      </Typography>
      {jobs.map((job) => (
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
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="primary" onClick={() => handleApplyClick(job)}>
              Apply Now
            </Button>
            <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteJob(job.id)}>
              Delete Job
            </Button>
          </CardActions>
        </Card>
      ))}

     
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
          {selectedJob && <JobForm job={selectedJob} onClose={handleClose} />}
        </Box>
      </Modal>
    </Box>
  );
};

export default JobListing;
