import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Typography, Button, Box, Paper, CircularProgress, Alert } from '@mui/material';
import { useLocation } from 'wouter';

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.warn('Missing VITE_STRIPE_PUBLIC_KEY environment variable. Stripe payment features will be limited.');
}

const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

interface CheckoutFormProps {
  bookingData: {
    type: string;
    amount: number;
    details: any;
  };
}

const CheckoutForm = ({ bookingData }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/booking-success',
        },
        redirect: 'if_required',
      });

      if (submitError) {
        setError(submitError.message || 'Payment failed');
        setProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        // Redirect to success page after a short delay
        setTimeout(() => {
          setLocation('/booking-success');
        }, 1000);
      } else {
        // Handle other statuses if needed
        setProcessing(false);
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {succeeded && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Payment successful! Redirecting...
        </Alert>
      )}
      
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <PaymentElement />
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button 
          variant="outlined" 
          onClick={() => window.history.back()}
          disabled={processing}
        >
          Back
        </Button>
        <Button 
          type="submit"
          variant="contained" 
          color="primary"
          disabled={!stripe || processing || succeeded}
        >
          {processing ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} />
              Processing...
            </>
          ) : (
            `Pay ₹${bookingData.amount.toFixed(2)}`
          )}
        </Button>
      </Box>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<CheckoutFormProps['bookingData'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you would get this data from the previous booking page
    // For demo, we'll use a sample booking
    const sampleBookingData = {
      type: 'flight',
      amount: 12999,
      details: {
        from: 'New Delhi',
        to: 'Mumbai',
        date: '2025-06-15',
        passengers: 1
      }
    };

    setBookingData(sampleBookingData);

    // Create PaymentIntent on the server
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            amount: sampleBookingData.amount,
            bookingType: sampleBookingData.type,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err: any) {
        setError(err.message || 'Failed to create payment intent');
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Preparing checkout...</Typography>
      </Container>
    );
  }

  if (error || !clientSecret || !bookingData || !stripePromise) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">
          {error || "Could not initialize payment. Please contact customer support."}
        </Alert>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button variant="outlined" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

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
        
        {bookingData.type === 'flight' && (
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
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Passengers:</Typography>
              <Typography>{bookingData.details.passengers}</Typography>
            </Box>
          </>
        )}
        
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
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm bookingData={bookingData} />
        </Elements>
      </Paper>
    </Container>
  );
}