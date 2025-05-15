import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Tabs, 
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Button,
  Grid,
  CircularProgress
} from '@mui/material';
import { Flight } from '@/lib/types';
import { selectFlightSearch, updateFlightSearch } from '@/store/searchSlice';
import FlightSearchDataGrid from '@/components/FlightSearchDataGrid';
import FlightResults from '@/components/FlightResults';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import dayjs from 'dayjs';

// City options for the dropdowns
const cityOptions = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa'
];

const FlightSearchPage = () => {
  const dispatch = useDispatch();
  const flightSearchParams = useSelector(selectFlightSearch);
  const [viewMode, setViewMode] = useState<'card' | 'grid'>('grid');
  
  // State for flight search results
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State for form fields
  const [source, setSource] = useState(flightSearchParams.source || 'Mumbai');
  const [destination, setDestination] = useState(flightSearchParams.destination || 'Delhi');
  const [departureDate, setDepartureDate] = useState(flightSearchParams.departureDate || dayjs().format('YYYY-MM-DD'));
  const [returnDate, setReturnDate] = useState(flightSearchParams.returnDate || dayjs().add(7, 'day').format('YYYY-MM-DD'));
  const [travelers, setTravelers] = useState(flightSearchParams.travelers || 1);
  const [cabinClass, setCabinClass] = useState(flightSearchParams.class || 'Economy');
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>(flightSearchParams.tripType || 'round-trip');
  
  // Handle form submission
  const handleSearch = () => {
    setLoading(true);
    
    // Update Redux store with current search parameters
    dispatch(updateFlightSearch({
      source,
      destination,
      departureDate,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      travelers,
      class: cabinClass,
      tripType
    }));
    
    // Fetch flight results
    fetchFlights();
  };
  
  // Fetch flights from API
  const fetchFlights = async () => {
    try {
      const response = await fetch(`/api/flights/search?source=${source}&destination=${destination}&date=${departureDate}`);
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setFlights(data);
      } else {
        setFlights([]);
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Swap source and destination
  const handleSwapCities = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };
  
  // Load flights on mount with default values
  useEffect(() => {
    handleSearch();
  }, []);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Search form */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Tabs 
            value={tripType === 'one-way' ? 0 : 1}
            onChange={(_, newValue) => setTripType(newValue === 0 ? 'one-way' : 'round-trip')}
            sx={{ 
              mb: 3,
              '.MuiTabs-indicator': { 
                height: '3px',
                borderTopLeftRadius: '3px',
                borderTopRightRadius: '3px',
                bgcolor: '#008cff'
              }
            }}
          >
            <Tab 
              label="One Way" 
              sx={{ 
                textTransform: 'none',
                fontWeight: tripType === 'one-way' ? 'bold' : 'normal',
                color: tripType === 'one-way' ? '#008cff' : 'text.primary'
              }}
            />
            <Tab 
              label="Round Trip" 
              sx={{
                textTransform: 'none',
                fontWeight: tripType === 'round-trip' ? 'bold' : 'normal',
                color: tripType === 'round-trip' ? '#008cff' : 'text.primary'
              }}
            />
          </Tabs>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={2.5}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>From</InputLabel>
                <Select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  label="From"
                >
                  {cityOptions.map((city) => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={12} md={0.5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton 
                onClick={handleSwapCities}
                sx={{ 
                  bgcolor: 'rgba(0, 140, 255, 0.1)',
                  '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.2)' },
                  color: '#008cff'
                }}
              >
                <SwapHorizIcon />
              </IconButton>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2.5}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>To</InputLabel>
                <Select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  label="To"
                >
                  {cityOptions.map((city) => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={tripType === 'one-way' ? 2.5 : 1.5}>
              <FormControl fullWidth variant="outlined" size="small">
                <TextField
                  type="date"
                  label="Departure"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </FormControl>
            </Grid>
            
            {tripType === 'round-trip' && (
              <Grid item xs={12} sm={6} md={1.5}>
                <FormControl fullWidth variant="outlined" size="small">
                  <TextField
                    type="date"
                    label="Return"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}
            
            <Grid item xs={12} sm={6} md={1.5}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Travelers</InputLabel>
                <Select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  label="Travelers"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <MenuItem key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Class</InputLabel>
                <Select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  label="Class"
                >
                  <MenuItem value="Economy">Economy</MenuItem>
                  <MenuItem value="Premium Economy">Premium Economy</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="First">First Class</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={12} md={1}>
              <Button
                fullWidth
                variant="contained"
                sx={{ 
                  bgcolor: '#008cff', 
                  '&:hover': { bgcolor: '#0071ce' },
                  py: 1,
                  fontSize: '0.9rem'
                }}
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'SEARCH'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {/* View Mode Selector */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant={viewMode === 'card' ? 'contained' : 'outlined'}
          onClick={() => setViewMode('card')}
          sx={{ 
            mr: 1,
            bgcolor: viewMode === 'card' ? '#008cff' : 'transparent',
            color: viewMode === 'card' ? 'white' : '#008cff',
            borderColor: '#008cff',
            '&:hover': { 
              bgcolor: viewMode === 'card' ? '#0071ce' : 'rgba(0, 140, 255, 0.1)'
            }
          }}
        >
          Card View
        </Button>
        <Button 
          variant={viewMode === 'grid' ? 'contained' : 'outlined'}
          onClick={() => setViewMode('grid')}
          sx={{ 
            bgcolor: viewMode === 'grid' ? '#008cff' : 'transparent',
            color: viewMode === 'grid' ? 'white' : '#008cff',
            borderColor: '#008cff',
            '&:hover': { 
              bgcolor: viewMode === 'grid' ? '#0071ce' : 'rgba(0, 140, 255, 0.1)'
            }
          }}
        >
          Grid View
        </Button>
      </Box>
      
      {/* Results */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : flights.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>No flights found</Typography>
          <Typography variant="body2" color="text.secondary">
            Try changing your search parameters or select different dates.
          </Typography>
        </Paper>
      ) : viewMode === 'grid' ? (
        <FlightSearchDataGrid 
          flights={flights} 
          sourceCity={source} 
          destinationCity={destination} 
        />
      ) : (
        <FlightResults 
          flights={flights} 
          loading={false} 
          sourceCity={source} 
          destinationCity={destination} 
        />
      )}
      
      {/* Popular city pairs and deals */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Popular Flight Routes from {source}
        </Typography>
        <Grid container spacing={2}>
          {['Delhi', 'Bangalore', 'Chennai', 'Hyderabad'].map((city) => (
            <Grid item xs={12} sm={6} md={3} key={city}>
              <Paper 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 3 }
                }}
                onClick={() => {
                  setDestination(city);
                  handleSearch();
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {source} to {city}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {Math.floor(Math.random() * 10) + 1} flights daily
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
                    Starting from
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="#008cff">
                    ₹{Math.floor(Math.random() * 3000) + 3000}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FlightSearchPage;