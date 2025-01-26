import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SelectChangeEvent,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { referralService } from '../services/api';
import { Referral, ReferralStatus } from '../types';

const getStatusColor = (status: ReferralStatus) => {
  switch (status) {
    case ReferralStatus.NEW:
      return 'new';
    case ReferralStatus.EVALUATED:
      return 'evaluated';
    case ReferralStatus.HIRED:
      return 'hired';
    case ReferralStatus.REJECTED:
      return 'rejected';
    default:
      return '';
  }
};

export const ReferralList: React.FC = () => {
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    loadReferrals();
  }, []);

  const loadReferrals = async () => {
    try {
      const data = await referralService.getReferrals();
      setReferrals(data);
    } catch (error) {
      console.error('Failed to load referrals:', error);
    }
  };

  const handleStatusChange = async (referral: Referral, newStatus: string) => {
    try {
      await referralService.updateStatus(referral._id, newStatus);
      loadReferrals();
      setStatusDialogOpen(false);
      setSelectedReferral(null);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const ReferralCard = ({ referral }: { referral: Referral }) => (
    <Card className="referral-card">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {referral.name}
          </Typography>
          <Chip
            label={referral.status}
            className={`status-chip ${getStatusColor(referral.status)}`}
            onClick={() => {
              setSelectedReferral(referral);
              setStatusDialogOpen(true);
            }}
          />
        </Box>
        <Typography color="textSecondary" gutterBottom>
          {referral.email}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Experience: {referral.experience} years
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            size="small"
            href={`https://workoai-2.onrender.com${referral.resumeUrl}`}
            target="_blank"
          >
            View Resume
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" className="page-title">
          Candidates
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/referrals/new')}
          sx={{
            backgroundColor: '#B5AC9A',
          }}
        >
          New Referral
        </Button>
      </Box>

      {isMobile ? (
        <Grid container spacing={2}>
          {referrals.map((referral) => (
            <Grid item xs={12} key={referral._id}>
              <ReferralCard referral={referral} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Resume</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {referrals.map((referral) => (
                <TableRow key={referral._id}>
                  <TableCell>{referral.name}</TableCell>
                  <TableCell>{referral.email}</TableCell>
                  <TableCell>{referral.experience} years</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      href={`https://workoai-2.onrender.com${referral.resumeUrl}`}
                      target="_blank"
                    >
                      View Resume
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={referral.status}
                      className={`status-chip ${getStatusColor(referral.status)}`}
                      onClick={() => {
                        setSelectedReferral(referral);
                        setStatusDialogOpen(true);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(referral.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
  open={statusDialogOpen}
  onClose={() => setStatusDialogOpen(false)}
  sx={{
    '& .MuiDialog-paper': {
      width: '400px',   
      height: '300px',  
      backgroundColor: '#EAEAEA',  
    },
  }}
>
  <DialogTitle>Status</DialogTitle>
  <DialogContent>
    <Select
      value={selectedReferral?.status || ''}
      onChange={(event: SelectChangeEvent) => {
        if (selectedReferral) {
          handleStatusChange(selectedReferral, event.target.value);
        }
      }}
      fullWidth
    >
      {Object.values(ReferralStatus).map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
  </DialogActions>
</Dialog>

    </Container>
  );
};
