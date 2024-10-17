import {Box, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { useNavigate  } from 'react-router-dom';



const SignUpForm = () => {

    return (
     <Box
     sx={{
        padding: 4,
        backgroundColor: '#FFFFFF',
        margin: 'auto',
        boxShadow: 3,
        marginTop: 10,
        borderRadius: 3,
        maxWidth: 600,
        
    }}
     >
       <Typography
       variant='h4'
       gutterBottom
       sx={{
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        backgroundColor: '#007BFF',
        padding: 2,
        borderRadius: 1
       }}
       >
       Sign up
       </Typography>
       <form style={{
        marginTop: '16px'
       }}>
        <TextField
          fullWidth
          label="Full Name"
          variant='outlined'
          margin="normal"
          required
         />
         <TextField
          fullWidth
          label="Email"
          variant='outlined'
          margin="normal"
          required
         />

        <TextField
          fullWidth
          label="Password"
          variant='outlined'
          margin="normal"
          required
         />
         <TextField
          fullWidth
          label="Confirm Password"
          variant='outlined'
          margin="normal"
          required
         />
         <FormControl fullWidth variant='outlined' margin='normal' required>
            <InputLabel>Select Your Role</InputLabel>
            <Select
             label="Select your role"
            >
                <MenuItem value="Job Seeker">Job Seeker</MenuItem>
                <MenuItem value="Recruiter">Recruiter</MenuItem>
            </Select>
         </FormControl>
        
       <Button variant='contained' color="primary" type="submit" sx={{  marginTop: 2}}>
        Submit  Job Posting
       </Button>
       </form>
     </Box>

    );
}

export default SignUpForm