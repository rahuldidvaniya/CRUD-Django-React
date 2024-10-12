import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CardActions, Button, CircularProgress } from '@mui/material';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/job/'); // Your API endpoint
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
      <Typography variant="h3" component="h2" sx={{ mb: 4, fontWeight: 'bold' }}>
        Job Opportunities
      </Typography>
      {jobs.map((job) => (
        <Card
          key={job.id}
          sx={{
            width: '80%', // Control card width
            margin: 2, // Increased margin for the card
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
              {job.company_name} - {job.job_type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.description}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Location: {job.location}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Salary: ₹{job.salary}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="primary">
              Apply Now
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default JobListing;
