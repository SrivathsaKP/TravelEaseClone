import { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Paper, Alert, Divider } from '@mui/material';
import { useLocation } from 'wouter';

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [bookingData, setBookingData] = useState({
    type: 'flight',
    amount: 0,
    details: {
      from: '',
      to: '',
      date: '',
      passengers: 1,
      airline: '',
      flightNumber: '',
      departureTime: '',
      arrivalTime: '',
      duration: ''
    }
  });

  useEffect(() => {
    // Retrieve booking data from sessionStorage
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }
  }, []);

  const handleProceedToSuccess = () => {
    // Store booking in sessionStorage for the success page
    sessionStorage.setItem('confirmedBooking', JSON.stringify({
      ...bookingData,
      bookingId: 'BK' + Math.floor(Math.random() * 10000000),
      bookingDate: new Date().toISOString(),
      status: 'Confirmed',
      paymentStatus: 'Paid'
    }));
    
    setLocation('/booking-success');
  };

  // Determine what fields to show based on booking type
  const renderBookingDetails = () => {
    switch(bookingData.type) {
      case 'flight':
        return (
          <>
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
            
            {bookingData.details.airline && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Airline:</Typography>
                <Typography>{bookingData.details.airline}</Typography>
              </Box>
            )}
            
            {bookingData.details.flightNumber && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Flight Number:</Typography>
                <Typography>{bookingData.details.flightNumber}</Typography>
              </Box>
            )}
            
            {bookingData.details.departureTime && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Departure Time:</Typography>
                <Typography>{bookingData.details.departureTime}</Typography>
              </Box>
            )}
            
            {bookingData.details.arrivalTime && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Arrival Time:</Typography>
                <Typography>{bookingData.details.arrivalTime}</Typography>
              </Box>
            )}
            
            {bookingData.details.duration && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Duration:</Typography>
                <Typography>{bookingData.details.duration}</Typography>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Passengers:</Typography>
              <Typography>{bookingData.details.passengers}</Typography>
            </Box>
          </>
        );
      // Add other cases for hotel, bus, etc. as needed
      default:
        return (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>No details available</Typography>
            </Box>
          </>
        );
    }
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
        
        <Divider sx={{ my: 2 }} />
        
        {renderBookingDetails()}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Total Amount:
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
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