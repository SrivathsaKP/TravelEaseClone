import { useState } from 'react';
import { 
  Container, 
  Paper, 
  Box, 
  Typography, 
  Grid, 
  Button, 
  IconButton, 
  TextField, 
  MenuItem, 
  Slider,
  InputAdornment,
  Divider,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Fade,
  FormControl
} from '@mui/material';
import { 
  LocationOn, 
  DateRange, 
  Person, 
  Search, 
  FilterList,
  FlightTakeoff,
  Hotel,
  DirectionsCar,
  Restaurant,
  PhotoCamera,
  KeyboardArrowRight,
  Star
} from '@mui/icons-material';
import { styled, alpha } from '@mui/system';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import TabNavigation from '@/components/TabNavigation';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from '@/lib/utils';
import { useLocation } from 'wouter';

// Styled Components
const SearchContainer = styled(Container)(({ theme }) => ({
  marginTop: '-50px',
  marginBottom: '30px',
  position: 'relative',
  zIndex: 10,
}));

const PackageCard = styled(Card)(({ theme }) => ({
  borderRadius: '8px',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const PackageImage = styled(CardMedia)(({ theme }) => ({
  height: 220,
  position: 'relative',
}));

const PackagePrice = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '8px 12px',
  borderTopRightRadius: '8px',
}));

const PackageType = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontWeight: 600,
}));

const TabButton = styled(Button)(({ theme, selected }: { theme: any, selected?: boolean }) => ({
  borderRadius: '20px',
  padding: '6px 16px',
  margin: '0 6px',
  minWidth: '80px',
  backgroundColor: selected ? theme.palette.primary.main : 'white',
  color: selected ? 'white' : theme.palette.text.primary,
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: selected ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : '#f5f5f5',
  },
}));

// Locations for package search
const destinations = [
  'Goa', 'Kerala', 'Andaman', 'Himachal', 'Rajasthan', 'Dubai', 'Maldives', 'Thailand', 'Singapore'
];

// Departure cities
const departureCities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'
];

// Package types
const packageTypes = [
  'ALL PACKAGES', 'BOOK @ ₹0', 'BEACHFRONT BLISS', 'HONEYMOON', 'XPRESS HOLIDAYS', 'SUMMER SPECIAL'
];

// Sample packages data
const samplePackages = [
  {
    id: 1,
    name: 'Most Wanted Goa Package',
    type: 'BESTSELLER',
    nights: 3,
    days: 4,
    price: 12999,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    includes: ['Flights', 'Stays', 'Activities'],
    rating: 4.2,
    reviews: 25
  },
  {
    id: 2,
    name: 'Goa Fun Fiesta',
    type: 'POPULAR',
    nights: 4,
    days: 5,
    price: 15499,
    image: 'https://images.unsplash.com/photo-1463695970743-ae65cca05743?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    includes: ['Flights', 'Stays', 'Activities', 'Sightseeing'],
    rating: 4.5,
    reviews: 42
  },
  {
    id: 3,
    name: 'Beachside Bliss Kerala',
    type: 'BEACHFRONT',
    nights: 5,
    days: 6,
    price: 22499,
    image: 'https://images.unsplash.com/photo-1580391564590-adf33a3f338a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    includes: ['Flights', 'Stays', 'Activities', 'Meals'],
    rating: 4.7,
    reviews: 36
  },
  {
    id: 4,
    name: 'Royal Rajasthan Tour',
    type: 'PREMIUM',
    nights: 6,
    days: 7,
    price: 26999,
    image: 'https://images.unsplash.com/photo-1599661046307-bdf53f1d8e5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    includes: ['Flights', 'Stays', 'Activities', 'Guide'],
    rating: 4.8,
    reviews: 51
  },
  {
    id: 5,
    name: 'Andaman Island Escape',
    type: 'HONEYMOON',
    nights: 5,
    days: 6,
    price: 31999,
    image: 'https://images.unsplash.com/photo-1586500036065-8395aa17aded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    includes: ['Flights', 'Stays', 'Activities', 'Transfers', 'Some Meals'],
    rating: 4.9,
    reviews: 47
  },
  {
    id: 6,
    name: 'Shimla Manali Adventure',
    type: 'ADVENTURE',
    nights: 6,
    days: 7,
    price: 19999,
    image: 'https://images.unsplash.com/photo-1587974024921-9550e46b8abe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    includes: ['Flights', 'Stays', 'Activities', 'Transfers'],
    rating: 4.6,
    reviews: 38
  }
];

// Icons for package inclusions
const inclusionIcons: Record<string, JSX.Element> = {
  'Flights': <FlightTakeoff fontSize="small" />,
  'Stays': <Hotel fontSize="small" />,
  'Activities': <PhotoCamera fontSize="small" />,
  'Transfers': <DirectionsCar fontSize="small" />,
  'Meals': <Restaurant fontSize="small" />,
  'Sightseeing': <LocationOn fontSize="small" />,
  'Guide': <Person fontSize="small" />,
  'Some Meals': <Restaurant fontSize="small" />,
};

const HolidayPackagePage = () => {
  const [location, setLocation] = useLocation();
  const { getParam } = useSearchParams();
  
  // Get URL params or default values
  const fromCity = getParam('from') || 'Delhi';
  const toCity = getParam('to') || 'Goa';
  const startDate = getParam('date') || format(new Date(), 'yyyy-MM-dd');
  const roomsGuests = getParam('guests') || '2 Adults';
  
  // Form state
  const [departureCity, setDepartureCity] = useState(fromCity);
  const [destinationCity, setDestinationCity] = useState(toCity);
  const [travelDate, setTravelDate] = useState(startDate);
  const [guestsCount, setGuestsCount] = useState(roomsGuests);
  
  // Filter states
  const [selectedPackageType, setSelectedPackageType] = useState('ALL PACKAGES');
  const [durationFilter, setDurationFilter] = useState<[number, number]>([2, 7]); // in nights
  const [priceFilter, setPriceFilter] = useState<[number, number]>([5000, 50000]);
  
  // Handle search submission
  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('from', departureCity);
    searchParams.set('to', destinationCity);
    searchParams.set('date', travelDate);
    searchParams.set('guests', guestsCount);
    
    // Navigate to holiday packages results
    setLocation(`/holiday-packages/search?${searchParams.toString()}`);
  };

  // Set package type filter
  const handlePackageTypeChange = (type: string) => {
    setSelectedPackageType(type);
  };

  // Apply filters
  const filteredPackages = samplePackages.filter(pkg => {
    // Price filter
    if (pkg.price < priceFilter[0] || pkg.price > priceFilter[1]) {
      return false;
    }
    
    // Duration filter
    if (pkg.nights < durationFilter[0] || pkg.nights > durationFilter[1]) {
      return false;
    }
    
    // Package type filter
    if (selectedPackageType !== 'ALL PACKAGES') {
      const typeKey = selectedPackageType.replace(/\s/g, '_').toUpperCase();
      
      if (selectedPackageType === 'BEACHFRONT BLISS' && pkg.type !== 'BEACHFRONT') {
        return false;
      }
      if (selectedPackageType === 'BOOK @ ₹0' && pkg.id % 2 !== 0) { // Just for demonstration
        return false;
      }
      if (selectedPackageType === 'HONEYMOON' && pkg.type !== 'HONEYMOON') {
        return false;
      }
      if (selectedPackageType === 'XPRESS HOLIDAYS' && pkg.days > 5) {
        return false;
      }
      if (selectedPackageType === 'SUMMER SPECIAL' && pkg.id % 3 !== 0) { // Just for demonstration
        return false;
      }
    }
    
    return true;
  });

  return (
    <>
      <Helmet>
        <title>{location.includes('/holiday-packages/search') 
          ? `${fromCity} to ${toCity} Holiday Packages | TravelEase` 
          : 'Holiday Packages | TravelEase'}</title>
        <meta name="description" content="Book holiday packages with flights, hotels, sightseeing, and more. Best deals on vacation packages for domestic and international travel." />
      </Helmet>

      {/* Hero header with beautiful imagery */}
      <Box sx={{ 
        bgcolor: '#0A346F', 
        height: '250px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: "url('https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }
      }}>
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" component="h1" sx={{ color: 'white', textAlign: 'center', mt: 3 }}>
            {location.includes('/holiday-packages/search') 
              ? `${toCity} Packages` 
              : 'Holiday Packages'}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'white', textAlign: 'center', mt: 1 }}>
            Experience beaches and sunset
          </Typography>
        </Container>
      </Box>



      {/* Search Form */}
      <SearchContainer maxWidth="lg">
        <Paper elevation={3} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
          <Box sx={{ p: 3, bgcolor: '#f8f8f8' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2.5}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    select
                    label="STARTING FROM"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {departureCities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2.5}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    select
                    label="GOING TO"
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {destinations.map((dest) => (
                      <MenuItem key={dest} value={dest}>
                        {dest}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={2.5}>
                <TextField
                  fullWidth
                  label="STARTING DATE"
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRange color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={6} md={2.5}>
                <TextField
                  select
                  fullWidth
                  label="ROOMS & GUESTS"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="1 Adult">1 Room, 1 Adult</MenuItem>
                  <MenuItem value="2 Adults">1 Room, 2 Adults</MenuItem>
                  <MenuItem value="2 Adults, 1 Child">1 Room, 2 Adults, 1 Child</MenuItem>
                  <MenuItem value="2 Adults, 2 Children">1 Room, 2 Adults, 2 Children</MenuItem>
                  <MenuItem value="2 Rooms">2 Rooms, 4 Adults</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ 
                    height: '56px', 
                    bgcolor: '#ff9800', 
                    '&:hover': { bgcolor: '#f57c00' }
                  }}
                  onClick={handleSearch}
                  startIcon={<Search />}
                >
                  SEARCH
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </SearchContainer>

      {/* Package Listing Section */}
      <Container maxWidth="lg" sx={{ my: 5 }}>
        {/* Package Type Filter */}
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', py: 1, pb: 2 }}>
          {packageTypes.map((type) => (
            <TabButton 
              key={type} 
              onClick={() => handlePackageTypeChange(type)}
              selected={selectedPackageType === type}
            >
              {type}
            </TabButton>
          ))}
        </Box>

        {/* Filters Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: '8px' }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Duration (in Nights)
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={durationFilter}
                    onChange={(_, newValue) => setDurationFilter(newValue as [number, number])}
                    min={2}
                    max={10}
                    step={1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}N`}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      {durationFilter[0]} Nights
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {durationFilter[1]} Nights
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: '8px' }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Budget (per person)
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={priceFilter}
                    onChange={(_, newValue) => setPriceFilter(newValue as [number, number])}
                    min={5000}
                    max={50000}
                    step={1000}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `₹${value}`}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      ₹{priceFilter[0]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{priceFilter[1]}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Packages Grid */}
        <Grid container spacing={3}>
          {filteredPackages.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '8px' }}>
                <Typography variant="h6" gutterBottom>No packages found</Typography>
                <Typography variant="body1">
                  Try adjusting your filters or search for a different destination.
                </Typography>
              </Paper>
            </Grid>
          ) : (
            filteredPackages.map((pkg) => (
              <Grid item key={pkg.id} xs={12} sm={6} md={4}>
                <Fade in timeout={500}>
                  <PackageCard elevation={2}>
                    <PackageImage
                      image={pkg.image}
                      title={pkg.name}
                    >
                      <PackagePrice>
                        <Typography variant="body2">Starting from</Typography>
                        <Typography variant="h6" fontWeight={700}>₹{pkg.price}</Typography>
                      </PackagePrice>
                      <PackageType label={pkg.type} size="small" />
                    </PackageImage>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2" fontWeight={600} gutterBottom>
                        {pkg.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {pkg.nights} Nights / {pkg.days} Days
                        </Typography>
                        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                          <Star sx={{ color: '#FFB800', fontSize: 18, mr: 0.5 }} />
                          <Typography variant="body2" fontWeight={600}>
                            {pkg.rating} 
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                            ({pkg.reviews})
                          </Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ my: 1.5 }} />
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        Inclusions:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 1 }}>
                        {pkg.includes.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                            {inclusionIcons[item]}
                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary"
                        endIcon={<KeyboardArrowRight />}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </PackageCard>
                </Fade>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};

export default HolidayPackagePage;