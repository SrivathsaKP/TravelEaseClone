import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper,
  Grid
} from '@mui/material';
import {
  SearchResultsSkeleton,
  HotelCardSkeleton,
  FlightCardSkeleton,
  FormSkeleton,
  LoadingOverlaySkeleton
} from '@/components/ui/skeleton';

const SkeletonExample = () => {
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const handleShowOverlay = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Skeleton Components Example
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Button onClick={handleReload} variant="contained" sx={{ mr: 2 }}>
          Reload Content
        </Button>
        <Button onClick={handleShowOverlay} variant="outlined">
          Show Loading Overlay
        </Button>
      </Box>

      {/* Flight Search Example */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Flight Search Results
        </Typography>
        {loading ? (
          <SearchResultsSkeleton type="flight" count={3} />
        ) : (
          <Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Flight results loaded successfully!
            </Typography>
            <Grid container spacing={2}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Grid item xs={12} key={index}>
                  <FlightCardSkeleton />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Hotel Search Example */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Hotel Search Results
        </Typography>
        {loading ? (
          <SearchResultsSkeleton type="hotel" count={4} />
        ) : (
          <Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Hotel results loaded successfully!
            </Typography>
            <Grid container spacing={2}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <HotelCardSkeleton />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Form Example */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Search Form
        </Typography>
        {loading ? (
          <FormSkeleton fields={5} />
        ) : (
          <Box>
            <Typography variant="body1" color="text.secondary">
              Form loaded successfully!
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Loading Overlay Example */}
      <Paper sx={{ p: 3, position: 'relative', minHeight: 200 }}>
        <Typography variant="h6" gutterBottom>
          Content with Loading Overlay
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          This content can be covered by a loading overlay when needed.
        </Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography>Sample content that would be covered by the overlay</Typography>
        </Box>
        {showOverlay && <LoadingOverlaySkeleton message="Processing..." />}
      </Paper>
    </Container>
  );
};

export default SkeletonExample;
