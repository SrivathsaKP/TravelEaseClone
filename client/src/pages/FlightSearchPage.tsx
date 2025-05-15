import { useState, useEffect } from 'react';
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
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup,
  InputAdornment,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import { 
  FlightTakeoff, 
  FlightLand, 
  DateRange, 
  SwapHoriz, 
  People, 
  ArrowForward, 
  ArrowBack 
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import TabNavigation from '@/components/TabNavigation';
import { useQuery } from '@tanstack/react-query';
import { Flight } from '@/lib/types';
import { useSearchParams } from '@/lib/utils';
import { useLocation } from 'wouter';

// Styled Components
const SearchContainer = styled(Container)(({ theme }) => ({
  marginTop: '-50px',
  marginBottom: '30px',
  position: 'relative',
  zIndex: 10,
}));

const FlightCard = styled(Paper)(({ theme }) => ({
  padding: '24px',
  marginBottom: '16px',
  borderRadius: '8px',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
}));

const DateTab = styled(Tab)(({ theme }) => ({
  minWidth: '110px',
  padding: '10px 16px',
  fontSize: '14px',
  fontWeight: 600,
  color: '#000',
  '&.Mui-selected': {
    color: '#008cff',
    backgroundColor: 'rgba(0, 140, 255, 0.1)',
    borderRadius: '4px',
  }
}));

// Data for the city selection
const cities = [
  { code: 'BOM', name: 'Mumbai', country: 'India' },
  { code: 'DEL', name: 'Delhi', country: 'India' },
  { code: 'BLR', name: 'Bengaluru', country: 'India' },
  { code: 'CCU', name: 'Kolkata', country: 'India' },
  { code: 'HYD', name: 'Hyderabad', country: 'India' },
  { code: 'MAA', name: 'Chennai', country: 'India' },
  { code: 'GOI', name: 'Goa', country: 'India' },
];

const ticketClasses = [
  { value: 'economy', label: 'Economy' },
  { value: 'premiumEconomy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First Class' },
];

const fareTypes = [
  { value: 'regular', label: 'Regular' },
  { value: 'student', label: 'Student' },
  { value: 'seniorCitizen', label: 'Senior Citizen' },
  { value: 'armedForces', label: 'Armed Forces' },
  { value: 'doctor', label: 'Doctor & Nurses' },
];

const FlightSearchPage = () => {
  const [location, setLocation] = useLocation();
  const { getParam } = useSearchParams();
  
  // Get URL params or default values
  const source = getParam('source') || 'BOM';
  const destination = getParam('destination') || 'BLR';
  const departureDate = getParam('departureDate') || format(new Date(), 'yyyy-MM-dd');
  const returnDate = getParam('returnDate') || '';
  const travelers = getParam('travelers') || '1 Adult';
  const classType = getParam('class') || 'economy';
  
  // Form state
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>(returnDate ? 'round-trip' : 'one-way');
  const [sourceCity, setSourceCity] = useState(source);
  const [destinationCity, setDestinationCity] = useState(destination);
  const [departDate, setDepartDate] = useState(departureDate);
  const [returnDeptDate, setReturnDeptDate] = useState(returnDate);
  const [passengerCount, setPassengerCount] = useState(travelers);
  const [travelClass, setTravelClass] = useState(classType);
  const [fareType, setFareType] = useState('regular');
  const [dateTabValue, setDateTabValue] = useState(0);

  // Mock dates for the date navigation tabs
  const dateTabs = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: format(date, 'EEE'),
      date: format(date, 'MMM dd'),
      formattedDate: format(date, 'yyyy-MM-dd'),
      price: Math.floor(Math.random() * 2000) + 4000 // Random price
    };
  });

  const handleDateTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setDateTabValue(newValue);
    setDepartDate(dateTabs[newValue].formattedDate);
  };

  // Swap source and destination
  const handleSwapCities = () => {
    const temp = sourceCity;
    setSourceCity(destinationCity);
    setDestinationCity(temp);
  };

  // Handle search submission
  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('source', sourceCity);
    searchParams.set('destination', destinationCity);
    searchParams.set('departureDate', departDate);
    
    if (tripType === 'round-trip' && returnDeptDate) {
      searchParams.set('returnDate', returnDeptDate);
    }
    
    searchParams.set('travelers', passengerCount);
    searchParams.set('class', travelClass);
    searchParams.set('fareType', fareType);
    
    // Navigate to flight results
    setLocation(`/flights/search?${searchParams.toString()}`);
  };

  // Fetch flights from API if on search results page
  const { data, isLoading } = useQuery<{data: Flight[]}>({
    queryKey: ['/api/flights/search', sourceCity, destinationCity, departDate],
    enabled: location.includes('/flights/search')
  });

  const flights = data?.data || [];

  // Format flight departure/arrival times
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return format(date, 'HH:mm');
  };

  // Calculate flight duration
  const calculateDuration = (departure: string, arrival: string) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diffInMinutes = Math.round((arr.getTime() - dep.getTime()) / 60000);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <Helmet>
        <title>{location.includes('/flights/search') 
          ? `${cities.find(c => c.code === sourceCity)?.name || sourceCity} to ${cities.find(c => c.code === destinationCity)?.name || destinationCity} Flights` 
          : 'Flight Booking | TravelEase'}</title>
        <meta name="description" content="Book flights online with the best deals and offers. Compare airfares across airlines and find the cheapest flights." />
      </Helmet>

      {/* Hero header */}
      <Box sx={{ bgcolor: '#051423', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container>
          <Typography variant="h4" component="h1" sx={{ color: 'white', textAlign: 'center', mt: 3 }}>
            {location.includes('/flights/search') 
              ? `${cities.find(c => c.code === sourceCity)?.name || sourceCity} to ${cities.find(c => c.code === destinationCity)?.name || destinationCity} Flights` 
              : 'Flight Booking'}
          </Typography>
        </Container>
      </Box>

      {/* Tab Navigation */}
      <Container sx={{ mt: -2, mb: 2 }}>
        <TabNavigation />
      </Container>

      {/* Search Form */}
      <SearchContainer maxWidth="lg">
        <Paper elevation={3} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
          <Box sx={{ p: 3, bgcolor: '#f8f8f8' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <RadioGroup
                  row
                  name="trip-type"
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value as 'one-way' | 'round-trip')}
                  sx={{ mb: 2 }}
                >
                  <FormControlLabel value="one-way" control={<Radio color="primary" />} label="One Way" />
                  <FormControlLabel value="round-trip" control={<Radio color="primary" />} label="Round Trip" />
                </RadioGroup>
              </Grid>

              <Grid item xs={12} md={5}>
                <Grid container spacing={2}>
                  <Grid item xs={5.5}>
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        select
                        label="FROM"
                        value={sourceCity}
                        onChange={(e) => setSourceCity(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FlightTakeoff color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      >
                        {cities.map((city) => (
                          <MenuItem key={city.code} value={city.code}>
                            <Box>
                              <Typography component="span" fontWeight="bold">{city.name}</Typography>
                              <Typography component="span" color="textSecondary" sx={{ ml: 1, fontSize: '0.875rem' }}>
                                {city.code}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" display="block">
                                {city.country}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton 
                      color="primary" 
                      onClick={handleSwapCities}
                      sx={{ 
                        bgcolor: '#e8f4ff', 
                        border: '1px solid #cce5ff',
                        '&:hover': { bgcolor: '#d1e9ff' }
                      }}
                    >
                      <SwapHoriz />
                    </IconButton>
                  </Grid>
                  
                  <Grid item xs={5.5}>
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        select
                        label="TO"
                        value={destinationCity}
                        onChange={(e) => setDestinationCity(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FlightLand color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      >
                        {cities.map((city) => (
                          <MenuItem 
                            key={city.code} 
                            value={city.code}
                            disabled={city.code === sourceCity}
                          >
                            <Box>
                              <Typography component="span" fontWeight="bold">{city.name}</Typography>
                              <Typography component="span" color="textSecondary" sx={{ ml: 1, fontSize: '0.875rem' }}>
                                {city.code}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" display="block">
                                {city.country}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="DEPART"
                      type="date"
                      value={departDate}
                      onChange={(e) => setDepartDate(e.target.value)}
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
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="RETURN"
                      type="date"
                      value={returnDeptDate}
                      onChange={(e) => setReturnDeptDate(e.target.value)}
                      disabled={tripType === 'one-way'}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DateRange color={tripType === 'one-way' ? 'disabled' : 'primary'} />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={3}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      select
                      fullWidth
                      label="TRAVELERS & CLASS"
                      value={travelClass}
                      onChange={(e) => setTravelClass(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <People color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {ticketClasses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Typography>{passengerCount} - {option.label}</Typography>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ 
                        height: '56px', 
                        bgcolor: '#ff9800', 
                        '&:hover': { bgcolor: '#f57c00' }
                      }}
                      onClick={handleSearch}
                    >
                      SEARCH
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>Fare Type:</Typography>
              <RadioGroup
                row
                name="fare-type"
                value={fareType}
                onChange={(e) => setFareType(e.target.value)}
              >
                {fareTypes.map((type) => (
                  <FormControlLabel 
                    key={type.value} 
                    value={type.value} 
                    control={<Radio color="primary" size="small" />} 
                    label={type.label}
                    sx={{ mr: 2 }}
                  />
                ))}
              </RadioGroup>
            </Box>
          </Box>
        </Paper>
      </SearchContainer>

      {/* Flight Results Section */}
      {location.includes('/flights/search') && (
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              {sourceCity} → {destinationCity}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {new Date(departDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} 
              • {passengerCount}
            </Typography>
          </Box>

          {/* Date navigation */}
          <Paper elevation={1} sx={{ mb: 3, borderRadius: '8px', overflow: 'hidden' }}>
            <Tabs
              value={dateTabValue}
              onChange={handleDateTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="date navigation tabs"
              sx={{ 
                bgcolor: '#f8f8f8',
                '& .MuiTabs-indicator': { backgroundColor: 'transparent' }
              }}
            >
              {dateTabs.map((tab, index) => (
                <DateTab
                  key={index}
                  label={
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" component="div" fontWeight={600}>
                        {tab.day}, {tab.date}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        component="div" 
                        color={dateTabValue === index ? 'primary' : 'textSecondary'}
                        fontWeight={500}
                      >
                        ₹{tab.price}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Paper>

          {/* Sort options */}
          <Paper elevation={1} sx={{ mb: 3, p: 2, borderRadius: '8px' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" fontWeight={600}>Sort by:</Typography>
              </Grid>
              
              <Grid item>
                <Button 
                  variant="contained" 
                  disableElevation
                  sx={{ 
                    bgcolor: '#e8f4ff', 
                    color: '#0070c9',
                    fontWeight: 600,
                    '&:hover': { bgcolor: '#d1e9ff' }
                  }}
                >
                  Cheapest
                </Button>
              </Grid>
              
              <Grid item>
                <Button 
                  variant="text" 
                  sx={{ color: '#666', fontWeight: 500 }}
                >
                  Non-Stop
                </Button>
              </Grid>
              
              <Grid item>
                <Button 
                  variant="text" 
                  sx={{ color: '#666', fontWeight: 500 }}
                >
                  Fastest
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Flight results */}
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <Typography>Loading flights...</Typography>
            </Box>
          ) : flights.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '8px' }}>
              <Typography variant="h6" gutterBottom>No flights found</Typography>
              <Typography variant="body1">
                Try adjusting your search criteria or select a different date.
              </Typography>
            </Paper>
          ) : (
            <>
              {flights.map((flight, index) => (
                <FlightCard key={index} elevation={1}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={2} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                        <img
                          src={flight.airline.logo || 'https://via.placeholder.com/40'}
                          alt={flight.airline.name}
                          style={{ width: 40, height: 40, marginRight: 8 }}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {flight.airline.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {flight.flightNumber}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                        <Typography variant="h6" fontWeight={700}>
                          {formatTime(flight.departureTime)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {sourceCity}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        {calculateDuration(flight.departureTime, flight.arrivalTime)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ height: 1, bgcolor: '#ddd', flex: 1 }} />
                        <FlightTakeoff sx={{ mx: 1, transform: 'rotate(90deg)', color: '#0070c9' }} />
                        <Box sx={{ height: 1, bgcolor: '#ddd', flex: 1 }} />
                      </Box>
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        {flight.stopCount === 0 ? 'Non-stop' : `${flight.stopCount} stop(s)`}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                        <Typography variant="h6" fontWeight={700}>
                          {formatTime(flight.arrivalTime)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {destinationCity}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={2} sx={{ textAlign: 'right' }}>
                      <Typography variant="h5" fontWeight={700} color="primary">
                        ₹{flight.price.amount}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        per passenger
                      </Typography>
                      <Button 
                        variant="contained" 
                        sx={{ 
                          mt: 1,
                          bgcolor: '#ff9800', 
                          '&:hover': { bgcolor: '#f57c00' }
                        }}
                        fullWidth
                      >
                        Book Now
                      </Button>
                    </Grid>
                  </Grid>
                </FlightCard>
              ))}
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default FlightSearchPage;