import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Button, 
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import TabNavigation from '@/components/TabNavigation';

// Mock airport data
const airports = [
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International Airport' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International Airport' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai International Airport' },
  { code: 'BLR', city: 'Bangalore', name: 'Kempegowda International Airport' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhas Chandra Bose International Airport' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International Airport' },
  { code: 'COK', city: 'Kochi', name: 'Cochin International Airport' },
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy International Airport' },
  { code: 'LHR', city: 'London', name: 'Heathrow Airport' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport' },
  { code: 'SIN', city: 'Singapore', name: 'Singapore Changi Airport' },
];

// Fare types
const fareTypes = ['Regular Fare', 'Armed Forces Fare', 'Student Fare', 'Senior Citizen Fare'];

const FlightSearchPage = () => {
  const [, setLocation] = useLocation();
  const [tripType, setTripType] = useState('roundTrip');
  const [from, setFrom] = useState<{code: string; city: string; name: string} | null>(null);
  const [to, setTo] = useState<{code: string; city: string; name: string} | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  const [passengerCounts, setPassengerCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [cabinClass, setCabinClass] = useState('Economy');
  const [fareType, setFareType] = useState('Regular Fare');

  // Swap from and to airports
  const handleSwapAirports = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  // Update passenger count
  const updatePassengerCount = (type: 'adults' | 'children' | 'infants', increment: boolean) => {
    setPassengerCounts(prev => {
      const newCount = prev[type] + (increment ? 1 : -1);
      
      // Apply constraints
      if (type === 'adults' && newCount < 1) return prev; // At least 1 adult
      if (newCount < 0) return prev;
      if (type === 'infants' && newCount > prev.adults) return prev; // No more infants than adults
      if (prev.adults + prev.children + prev.infants + (increment ? 1 : -1) > 9) return prev; // Max 9 passengers
      
      return {
        ...prev,
        [type]: newCount
      };
    });
  };

  // Handle search
  const handleSearch = () => {
    if (!from || !to || !departureDate) {
      // Show validation error
      alert('Please select origin, destination, and departure date');
      return;
    }

    // Build search params
    const params = new URLSearchParams();
    params.append('origin', from.code);
    params.append('destination', to.code);
    params.append('departureDate', departureDate.toISOString().split('T')[0]);
    
    if (tripType === 'roundTrip' && returnDate) {
      params.append('returnDate', returnDate.toISOString().split('T')[0]);
    }
    
    params.append('adults', passengerCounts.adults.toString());
    params.append('children', passengerCounts.children.toString());
    params.append('infants', passengerCounts.infants.toString());
    params.append('cabinClass', cabinClass);
    params.append('fareType', fareType);
    
    // Navigate to results page
    setLocation('/flights/search?' + params.toString());
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="#008cff">
            Flight Search
          </Typography>
          
          {/* Trip Type */}
          <RadioGroup
            row
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            sx={{ mb: 3 }}
          >
            <FormControlLabel 
              value="oneWay" 
              control={<Radio />} 
              label="One Way" 
            />
            <FormControlLabel 
              value="roundTrip" 
              control={<Radio />} 
              label="Round Trip" 
            />
            <FormControlLabel 
              value="multiCity" 
              control={<Radio />} 
              label="Multi City" 
            />
          </RadioGroup>
          
          {/* Flight Search Form */}
          <Grid container spacing={3}>
            {/* From */}
            <Grid item xs={12} md={5.5}>
              <Autocomplete
                value={from}
                onChange={(event, newValue) => {
                  setFrom(newValue);
                }}
                options={airports}
                getOptionLabel={(option) => `${option.city} (${option.code})`}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="From" 
                    placeholder="Enter city or airport" 
                    fullWidth
                    required 
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div>
                      <Typography variant="body1">{option.city} ({option.code})</Typography>
                      <Typography variant="body2" color="text.secondary">{option.name}</Typography>
                    </div>
                  </li>
                )}
              />
            </Grid>
            
            {/* Swap button */}
            <Grid item xs={12} md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton 
                onClick={handleSwapAirports}
                sx={{ 
                  bgcolor: '#f2f2f2', 
                  '&:hover': { bgcolor: '#e6e6e6' },
                  height: 40, 
                  width: 40
                }}
              >
                <CompareArrowsIcon />
              </IconButton>
            </Grid>
            
            {/* To */}
            <Grid item xs={12} md={5.5}>
              <Autocomplete
                value={to}
                onChange={(event, newValue) => {
                  setTo(newValue);
                }}
                options={airports.filter(airport => airport.code !== from?.code)}
                getOptionLabel={(option) => `${option.city} (${option.code})`}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="To" 
                    placeholder="Enter city or airport" 
                    fullWidth 
                    required
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div>
                      <Typography variant="body1">{option.city} ({option.code})</Typography>
                      <Typography variant="body2" color="text.secondary">{option.name}</Typography>
                    </div>
                  </li>
                )}
              />
            </Grid>
            
            {/* Departure Date */}
            <Grid item xs={12} md={tripType === 'roundTrip' ? 6 : 4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Departure Date"
                  value={departureDate}
                  onChange={(newValue) => setDepartureDate(newValue)}
                  disablePast
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
            
            {/* Return Date (only for round trip) */}
            {tripType === 'roundTrip' && (
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Return Date"
                    value={returnDate}
                    onChange={(newValue) => setReturnDate(newValue)}
                    disablePast
                    minDate={departureDate || undefined}
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
            )}
            
            {/* Cabin Class */}
            {tripType !== 'roundTrip' && (
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="cabin-class-label">Cabin Class</InputLabel>
                  <Select
                    labelId="cabin-class-label"
                    value={cabinClass}
                    label="Cabin Class"
                    onChange={(e) => setCabinClass(e.target.value)}
                  >
                    <MenuItem value="Economy">Economy</MenuItem>
                    <MenuItem value="Premium Economy">Premium Economy</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="First">First Class</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            
            {/* Passengers */}
            {tripType !== 'roundTrip' && (
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Passengers"
                  value={`${passengerCounts.adults + passengerCounts.children + passengerCounts.infants} Traveller(s)`}
                  onClick={() => {
                    // This would typically open a dropdown in a real implementation
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}
            
            {/* Passenger selection controls */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2, mt: 1, display: tripType === 'roundTrip' ? 'block' : 'none' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={tripType === 'roundTrip' ? 4 : 12}>
                    <FormControl fullWidth>
                      <InputLabel id="cabin-class-label">Cabin Class</InputLabel>
                      <Select
                        labelId="cabin-class-label"
                        value={cabinClass}
                        label="Cabin Class"
                        onChange={(e) => setCabinClass(e.target.value)}
                      >
                        <MenuItem value="Economy">Economy</MenuItem>
                        <MenuItem value="Premium Economy">Premium Economy</MenuItem>
                        <MenuItem value="Business">Business</MenuItem>
                        <MenuItem value="First">First Class</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={tripType === 'roundTrip' ? 8 : 12}>
                    <Typography variant="subtitle2" gutterBottom>Passengers</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography>Adults (12+ yrs)</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updatePassengerCount('adults', false)}
                          disabled={passengerCounts.adults <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{passengerCounts.adults}</Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => updatePassengerCount('adults', true)}
                          disabled={passengerCounts.adults + passengerCounts.children + passengerCounts.infants >= 9}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography>Children (2-11 yrs)</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updatePassengerCount('children', false)}
                          disabled={passengerCounts.children <= 0}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{passengerCounts.children}</Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => updatePassengerCount('children', true)}
                          disabled={passengerCounts.adults + passengerCounts.children + passengerCounts.infants >= 9}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography>Infants (below 2 yrs)</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updatePassengerCount('infants', false)}
                          disabled={passengerCounts.infants <= 0}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{passengerCounts.infants}</Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => updatePassengerCount('infants', true)}
                          disabled={
                            passengerCounts.infants >= passengerCounts.adults || 
                            passengerCounts.adults + passengerCounts.children + passengerCounts.infants >= 9
                          }
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            {/* Fare Type */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Select A Fare Type</Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {fareTypes.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    onClick={() => setFareType(type)}
                    variant={fareType === type ? 'filled' : 'outlined'}
                    color={fareType === type ? 'primary' : 'default'}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </Grid>
            
            {/* Recent Searches would go here */}
            
            {/* Search Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                fullWidth
                sx={{ 
                  mt: 2, 
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  bgcolor: '#008cff',
                  '&:hover': {
                    bgcolor: '#0071ce',
                  }
                }}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom color="#008cff">
            Popular Flight Routes
          </Typography>
          <Grid container spacing={2}>
            {[
              { from: 'Delhi', to: 'Mumbai' },
              { from: 'Mumbai', to: 'Bangalore' },
              { from: 'Bangalore', to: 'Hyderabad' },
              { from: 'Chennai', to: 'Kolkata' }
            ].map((route, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Link href={`/flights/search?origin=${route.from}&destination=${route.to}`}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                  >
                    <Typography variant="body1">{route.from} to {route.to}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Flights from ₹3,499
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default FlightSearchPage;