import { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Paper, Divider, Chip, Grid } from '@mui/material';
import { useLocation } from 'wouter';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ShareIcon from '@mui/icons-material/Share';
import HomeIcon from '@mui/icons-material/Home';

export default function BookingSuccess() {
  const [, setLocation] = useLocation();
  const [bookingReference, setBookingReference] = useState<string>('');
  
  // In a real app, you would retrieve the booking details based on the URL params
  // Here we're generating a simulated booking reference
  useEffect(() => {
    // Generate a random booking reference for demonstration
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let reference = '';
    for (let i = 0; i < 8; i++) {
      reference += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setBookingReference(reference);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // In a real app, this would open a sharing dialog
    alert('Sharing functionality would be implemented here');
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        mb: 4
      }}>
        <CheckCircleOutlinedIcon 
          sx={{ 
            fontSize: 80, 
            color: 'success.main',
            mb: 2
          }} 
        />
        <Typography variant="h4" gutterBottom>
          Booking Confirmed!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your booking was successful. Thank you for choosing TravelEase.
        </Typography>
      </Box>
      
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Booking Details
          </Typography>
          <Chip 
            icon={<FlightTakeoffIcon />} 
            label="Flight" 
            color="primary" 
            variant="outlined" 
          />
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Booking Reference
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {bookingReference}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Booking Date
            </Typography>
            <Typography variant="body1">
              {new Date().toLocaleDateString()}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Passenger
            </Typography>
            <Typography variant="body1">
              John Doe
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Payment Method
            </Typography>
            <Typography variant="body1">
              Credit Card (xxxx-xxxx-xxxx-1234)
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              From
            </Typography>
            <Typography variant="body1">
              New Delhi (DEL)
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              To
            </Typography>
            <Typography variant="body1">
              Mumbai (BOM)
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Date
            </Typography>
            <Typography variant="body1">
              June 15, 2025
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Flight
            </Typography>
            <Typography variant="body1">
              Air India AI-123
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mt: 2,
              pt: 2,
              borderTop: '1px solid #eee'
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Total Amount
              </Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                ₹12,999.00
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        <Button 
          variant="outlined" 
          startIcon={<HomeIcon />}
          onClick={() => setLocation('/')}
        >
          Back to Home
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<LocalPrintshopIcon />}
          onClick={handlePrint}
        >
          Print
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={handleShare}
        >
          Share
        </Button>
      </Box>
    </Container>
  );
}