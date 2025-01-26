import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Paper,
} from '@mui/material';
import { referralService } from '../services/api';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  experience: yup
    .number()
    .required('Experience is required')
    .min(0, 'Experience cannot be negative'),
});

export const NewReferral: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      experience: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (!selectedFile) {
          setError('Please select a resume file');
          return;
        }
        const resumeUrl = await referralService.uploadResume(selectedFile);
        await referralService.createReferral({
          name: values.name,
          email: values.email,
          experience: Number(values.experience),
          resumeUrl: resumeUrl,
        });
        
        navigate('/referrals');
      } catch (err) {
        console.log(err);
        
        setError('Failed to create referral. Please try again.');
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          New Referral
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            id="experience"
            name="experience"
            label="Experience (years)"
            type="number"
            value={formik.values.experience}
            onChange={formik.handleChange}
            error={formik.touched.experience && Boolean(formik.errors.experience)}
            helperText={formik.touched.experience && formik.errors.experience}
            margin="normal"
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 1 }}
          >
            Upload Resume
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile && (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Selected file: {selectedFile.name}
            </Typography>
          )}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              onClick={() => navigate('/referrals')}
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
