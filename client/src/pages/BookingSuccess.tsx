import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper, 
  Divider,
  CircularProgress,
  Chip
} from '@mui/material';

export default function BookingSuccess() {
  const [, setLocation] = useLocation();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Try to retrieve booking data from sessionStorage
    try {
      const confirmedBooking = sessionStorage.getItem('confirmedBooking');
      if (confirmedBooking) {
        setBooking(JSON.parse(confirmedBooking));
      } else {
        setError('Booking information not found.');
      }
    } catch (err) {
      setError('Error retrieving booking information.');
      console.error(err);
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleEmailTicket = () => {
    alert('Email functionality would be implemented here.');
  };
  
  const renderBookingDetails = () => {
    if (!booking) return null;
    
    switch(booking.type) {
      case 'flight':
        return (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Route:</Typography>
              <Typography>
                {booking.details.from} → {booking.details.to}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Date:</Typography>
              <Typography>
                {new Date(booking.details.date).toLocaleDateString()}
              </Typography>
            </Box>
            
            {booking.details.airline && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Airline:</Typography>
                <Typography>{booking.details.airline}</Typography>
              </Box>
            )}
            
            {booking.details.flightNumber && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Flight Number:</Typography>
                <Typography>{booking.details.flightNumber}</Typography>
              </Box>
            )}
            
            {booking.details.departureTime && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Departure Time:</Typography>
                <Typography>{booking.details.departureTime}</Typography>
              </Box>
            )}
            
            {booking.details.arrivalTime && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Arrival Time:</Typography>
                <Typography>{booking.details.arrivalTime}</Typography>
              </Box>
            )}
            
            {booking.details.duration && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Duration:</Typography>
                <Typography>{booking.details.duration}</Typography>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Passengers:</Typography>
              <Typography>{booking.details.passengers}</Typography>
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

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} color="primary" />
          <Typography variant="h6" sx={{ mt: 3 }}>
            Processing Your Booking...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            {error}
          </Typography>
          <Typography paragraph>
            Please try again or contact customer support if the problem persists.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => setLocation('/')}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!booking) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            No booking information found
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => setLocation('/')}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        mb: 4
      }}>
        {/* Success Icon */}
        <Box 
          sx={{ 
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            color: 'white',
            fontWeight: 'bold',
            animation: 'fadeInScale 0.5s ease-out',
            '@keyframes fadeInScale': {
              '0%': {
                opacity: 0,
                transform: 'scale(0.5)'
              },
              '100%': {
                opacity: 1,
                transform: 'scale(1)'
              }
            }
          }}
        >
          ✓
        </Box>
        <Typography variant="h4" component="h1" sx={{ mt: 2, fontWeight: 'bold' }}>
          Booking Confirmed!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Your booking has been confirmed. Thank you for choosing TravelEase.
        </Typography>
      </Box>
      
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Booking Reference: <strong>{booking.bookingId}</strong>
          </Typography>
          <Typography 
            color="success.main"
            sx={{ fontWeight: 'bold', bgcolor: 'success.light', py: 0.5, px: 1.5, borderRadius: 1 }}
          >
            {booking.status}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Booking Details
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Booking Date:</Typography>
            <Typography>
              {new Date(booking.bookingDate).toLocaleDateString()}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Type:</Typography>
            <Typography sx={{ fontWeight: 'medium', textTransform: 'capitalize' }}>
              {booking.type}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Payment Status:</Typography>
            <Typography color="success.main" fontWeight="medium">
              {booking.paymentStatus}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Trip Details
          </Typography>
          
          {renderBookingDetails()}
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Total Amount:
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            ₹{booking.amount.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        <Button 
          variant="outlined" 
          onClick={handlePrint}
        >
          Print Ticket
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={handleEmailTicket}
        >
          Email Ticket
        </Button>
        
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setLocation('/')}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}