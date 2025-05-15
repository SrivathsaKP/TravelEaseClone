import { useState } from 'react';
import { Container, Typography, Button, Box, Paper, Alert } from '@mui/material';
import { useLocation } from 'wouter';

export default function Checkout() {
  const [, setLocation] = useLocation();
  const bookingData = {
    type: 'flight',
    amount: 12999,
    details: {
      from: 'New Delhi',
      to: 'Mumbai',
      date: '2025-06-15',
      passengers: 1
    }
  };

  const handleProceedToSuccess = () => {
    setLocation('/booking-success');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Complete Your Booking
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Booking Summary
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Type:</Typography>
          <Typography sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
            {bookingData.type}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Route:</Typography>
          <Typography>
            {bookingData.details.from} → {bookingData.details.to}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Date:</Typography>
          <Typography>
            {new Date(bookingData.details.date).toLocaleDateString()}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Passengers:</Typography>
          <Typography>{bookingData.details.passengers}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Total Amount:
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            ₹{bookingData.amount.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 3 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          To use Stripe payments, please provide the Stripe API keys.
        </Alert>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => window.history.back()}
          >
            Back
          </Button>
          
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleProceedToSuccess}
          >
            Simulate Payment & Continue
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}