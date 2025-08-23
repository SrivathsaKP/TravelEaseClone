import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Divider,
  Button
} from '@mui/material';
import {
  TextSkeleton,
  AvatarSkeleton,
  ImageSkeleton,
  CardSkeleton,
  HotelCardSkeleton,
  FlightCardSkeleton,
  DataGridSkeleton,
  FlightDataGridSkeleton,
  TrainCardSkeleton,
  TrainDataGridSkeleton,
  BusCardSkeleton,
  BusDataGridSkeleton,
  CabCardSkeleton,
  CabDataGridSkeleton,
  InsuranceCardSkeleton,
  InsuranceDataGridSkeleton,
  ListSkeleton,
  FormSkeleton,
  SearchResultsSkeleton,
  PageSkeleton,
  LoadingOverlaySkeleton,
  MuiSkeleton,
} from '@/components/ui/skeleton';

const SkeletonDemo = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        MUI Skeleton Components Demo
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        This page showcases all the different skeleton components available for loading states.
      </Typography>

      {/* Basic Skeletons */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Basic Skeletons
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Text Skeleton</Typography>
            <TextSkeleton width="80%" height={20} />
            <TextSkeleton width="60%" height={16} />
            <TextSkeleton width="40%" height={16} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Avatar Skeleton</Typography>
            <AvatarSkeleton size={60} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Image Skeleton</Typography>
            <ImageSkeleton width={200} height={150} />
          </Grid>
        </Grid>
      </Paper>

      {/* Card Skeletons */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Card Skeletons
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Generic Card Skeleton</Typography>
            <CardSkeleton showImage={true} showActions={true} lines={3} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Hotel Card Skeleton</Typography>
            <HotelCardSkeleton />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Flight Card Skeleton</Typography>
            <FlightCardSkeleton />
          </Grid>
        </Grid>
      </Paper>

             {/* Data Grid Skeletons */}
       <Paper sx={{ p: 3, mb: 4 }}>
         <Typography variant="h6" gutterBottom>
           Data Grid Skeletons
         </Typography>
         <Grid container spacing={3}>
           <Grid item xs={12} md={6}>
             <Typography variant="subtitle2" gutterBottom>Generic Data Grid Skeleton</Typography>
             <DataGridSkeleton rows={3} columns={4} />
           </Grid>
           <Grid item xs={12} md={6}>
             <Typography variant="subtitle2" gutterBottom>Flight Data Grid Skeleton</Typography>
             <FlightDataGridSkeleton rows={3} />
           </Grid>
         </Grid>
       </Paper>

               {/* Transport Skeletons */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Transport Skeletons
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Train Card Skeleton</Typography>
              <TrainCardSkeleton />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Bus Card Skeleton</Typography>
              <BusCardSkeleton />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Cab Card Skeleton</Typography>
              <CabCardSkeleton />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Insurance Card Skeleton</Typography>
              <InsuranceCardSkeleton />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Train Data Grid Skeleton</Typography>
              <TrainDataGridSkeleton rows={2} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Insurance Data Grid Skeleton</Typography>
              <InsuranceDataGridSkeleton rows={2} />
            </Grid>
          </Grid>
        </Paper>

      {/* List and Form Skeletons */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          List and Form Skeletons
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>List Skeleton</Typography>
            <ListSkeleton items={4} showAvatar={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>Form Skeleton</Typography>
            <FormSkeleton fields={4} />
          </Grid>
        </Grid>
      </Paper>

                           {/* Search Results Skeletons */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Search Results Skeletons
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Flight Search Results</Typography>
              <SearchResultsSkeleton type="flight" count={2} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Hotel Search Results</Typography>
              <SearchResultsSkeleton type="hotel" count={3} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Train Search Results</Typography>
              <SearchResultsSkeleton type="train" count={2} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Bus Search Results</Typography>
              <SearchResultsSkeleton type="bus" count={2} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Cab Search Results</Typography>
              <SearchResultsSkeleton type="cab" count={2} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Insurance Search Results</Typography>
              <SearchResultsSkeleton type="insurance" count={2} />
            </Grid>
          </Grid>
        </Paper>

      {/* Page Skeleton */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Page Skeleton
        </Typography>
        <PageSkeleton />
      </Paper>

      {/* Loading Overlay */}
      <Paper sx={{ p: 3, mb: 4, position: 'relative', minHeight: 200 }}>
        <Typography variant="h6" gutterBottom>
          Loading Overlay Skeleton
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This shows how the loading overlay would appear over content:
        </Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, minHeight: 100 }}>
          <Typography>Some content that would be covered by the loading overlay</Typography>
        </Box>
        <LoadingOverlaySkeleton message="Loading content..." />
      </Paper>

      {/* Usage Examples */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Usage Examples
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Here are some common usage patterns:
        </Typography>
        
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>Flight Search Page</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Replace CircularProgress with SearchResultsSkeleton:
            </Typography>
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`{loading ? (
  <SearchResultsSkeleton type="flight" count={5} />
) : (
  <FlightResults flights={flights} />
)}`}
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>Hotel Search Page</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Replace CircularProgress with SearchResultsSkeleton:
            </Typography>
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`{loading ? (
  <SearchResultsSkeleton type="hotel" count={6} />
) : (
  <HotelResults hotels={hotels} />
)}`}
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>Custom Card Loading</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Use specific card skeletons for better UX:
            </Typography>
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`{loading ? (
  <Grid container spacing={2}>
    {Array.from({ length: 6 }).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <HotelCardSkeleton />
      </Grid>
    ))}
  </Grid>
) : (
  // Actual content
)}`}
            </Box>
          </CardContent>
        </Card>
      </Paper>

      {/* Available Components */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Available Skeleton Components
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>Basic Components:</Typography>
            <ul>
              <li><code>TextSkeleton</code> - For text content</li>
              <li><code>AvatarSkeleton</code> - For user avatars</li>
              <li><code>ImageSkeleton</code> - For images</li>
                             <li><code>MuiSkeleton</code> - Raw MUI Skeleton</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>Complex Components:</Typography>
            <ul>
              <li><code>CardSkeleton</code> - Generic card layout</li>
              <li><code>HotelCardSkeleton</code> - Hotel-specific card</li>
              <li><code>FlightCardSkeleton</code> - Flight-specific card</li>
              <li><code>DataGridSkeleton</code> - Table layout</li>
              <li><code>FlightDataGridSkeleton</code> - Flight table layout</li>
              <li><code>ListSkeleton</code> - List items</li>
              <li><code>FormSkeleton</code> - Form fields</li>
              <li><code>SearchResultsSkeleton</code> - Search results</li>
              <li><code>PageSkeleton</code> - Full page layout</li>
              <li><code>LoadingOverlaySkeleton</code> - Overlay loading</li>
            </ul>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SkeletonDemo;
