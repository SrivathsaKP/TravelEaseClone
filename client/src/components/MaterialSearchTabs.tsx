import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SelectChangeEvent from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { 
  FlightTakeoff, 
  FlightLand, 
  Hotel, 
  DirectionsBus, 
  Train, 
  Home, 
  LocalTaxi, 
  Security,
  CalendarMonth,
  LocationOn,
  Person,
  SwapVert
} from '@mui/icons-material';
import { format } from 'date-fns';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`travel-tabpanel-${index}`}
      aria-labelledby={`travel-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `travel-tab-${index}`,
    'aria-controls': `travel-tabpanel-${index}`,
  };
}

const today = format(new Date(), 'yyyy-MM-dd');

const cities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa'
];

const MaterialSearchTabs: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [, navigate] = useLocation();

  // Flight search state
  const [flightSearch, setFlightSearch] = useState({
    tripType: 'one-way' as 'one-way' | 'round-trip',
    source: '',
    destination: '',
    departureDate: today,
    returnDate: '',
    travelers: '1 Adult'
  });

  // Hotel search state
  const [hotelSearch, setHotelSearch] = useState({
    destination: '',
    checkIn: today,
    checkOut: format(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd'),
    guests: '1 Adult',
    priceRange: 'Any'
  });

  // Homestay search state
  const [homestaySearch, setHomestaySearch] = useState({
    destination: '',
    checkIn: today,
    checkOut: format(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd'),
    guests: '1 Adult',
    propertyType: 'Any'
  });

  // Train search state
  const [trainSearch, setTrainSearch] = useState({
    source: '',
    destination: '',
    date: today,
    class: 'All Classes'
  });

  // Bus search state
  const [busSearch, setBusSearch] = useState({
    source: '',
    destination: '',
    date: today,
    busType: 'Any Bus'
  });

  // Cab search state
  const [cabSearch, setCabSearch] = useState({
    source: '',
    destination: '',
    pickupDate: today,
    pickupTime: '10:00',
    cabType: 'All Cabs'
  });

  // Insurance search state
  const [insuranceSearch, setInsuranceSearch] = useState({
    travelType: 'domestic' as 'domestic' | 'international',
    travelers: '1 Adult',
    startDate: today,
    duration: '7 days'
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/flights');
  };

  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/hotels');
  };

  const handleHomestaySearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/homestays');
  };

  const handleTrainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/trains');
  };

  const handleBusSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/buses');
  };

  const handleCabSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/cabs');
  };

  const handleInsuranceSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/insurance');
  };

  const swapLocations = (type: 'flight' | 'train' | 'bus') => {
    if (type === 'flight') {
      setFlightSearch({
        ...flightSearch,
        source: flightSearch.destination,
        destination: flightSearch.source
      });
    } else if (type === 'train') {
      setTrainSearch({
        ...trainSearch,
        source: trainSearch.destination,
        destination: trainSearch.source
      });
    } else if (type === 'bus') {
      setBusSearch({
        ...busSearch,
        source: busSearch.destination,
        destination: busSearch.source
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            background: 'linear-gradient(to right, #2196f3, #42a5f5)',
            color: 'white',
            '& .MuiTab-root': { 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.9rem',
              fontWeight: 500,
              p: 2,
              minWidth: 120
            },
            '& .Mui-selected': { 
              color: 'white',
              fontWeight: 600
            },
            '& .MuiTabs-indicator': { 
              backgroundColor: 'white' 
            }
          }}
        >
          <Tab icon={<FlightTakeoff />} label="Flights" {...a11yProps(0)} />
          <Tab icon={<Hotel />} label="Hotels" {...a11yProps(1)} />
          <Tab icon={<Home />} label="Homestays" {...a11yProps(2)} />
          <Tab icon={<Train />} label="Trains" {...a11yProps(3)} />
          <Tab icon={<DirectionsBus />} label="Buses" {...a11yProps(4)} />
          <Tab icon={<LocalTaxi />} label="Cabs" {...a11yProps(5)} />
          <Tab icon={<Security />} label="Insurance" {...a11yProps(6)} />
        </Tabs>

        {/* Flight Search Tab */}
        <TabPanel value={tabValue} index={0}>
          <form onSubmit={handleFlightSearch}>
            <Box sx={{ mb: 3 }}>
              <RadioGroup
                row
                name="tripType"
                value={flightSearch.tripType}
                onChange={(e) => setFlightSearch({...flightSearch, tripType: e.target.value as 'one-way' | 'round-trip'})}
              >
                <FormControlLabel value="one-way" control={<Radio />} label="One Way" />
                <FormControlLabel value="round-trip" control={<Radio />} label="Round Trip" />
              </RadioGroup>
            </Box>

            <Grid container spacing={3}>
              <Grid item={true} xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="From"
                    value={flightSearch.source}
                    onChange={(e) => setFlightSearch({...flightSearch, source: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlightTakeoff />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid xs={12} md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton 
                  onClick={() => swapLocations('flight')}
                  color="primary"
                  size="large"
                  sx={{ 
                    bgcolor: 'rgba(25, 118, 210, 0.08)', 
                    '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.15)' } 
                  }}
                >
                  <SwapVert />
                </IconButton>
              </Grid>

              <Grid xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="To"
                    value={flightSearch.destination}
                    onChange={(e) => setFlightSearch({...flightSearch, destination: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlightLand />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Departure Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={flightSearch.departureDate}
                  onChange={(e) => setFlightSearch({...flightSearch, departureDate: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {flightSearch.tripType === 'round-trip' && (
                <Grid xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Return Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={flightSearch.returnDate}
                    onChange={(e) => setFlightSearch({...flightSearch, returnDate: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              )}

              <Grid xs={12} md={flightSearch.tripType === 'one-way' ? 3 : 2}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Travelers"
                    value={flightSearch.travelers}
                    onChange={(e) => setFlightSearch({...flightSearch, travelers: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="1 Adult">1 Adult</MenuItem>
                    <MenuItem value="2 Adults">2 Adults</MenuItem>
                    <MenuItem value="2 Adults, 1 Child">2 Adults, 1 Child</MenuItem>
                    <MenuItem value="2 Adults, 2 Children">2 Adults, 2 Children</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Search Flights
              </Button>
            </Box>
          </form>
        </TabPanel>

        {/* Hotel Search Tab */}
        <TabPanel value={tabValue} index={1}>
          <form onSubmit={handleHotelSearch}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="City"
                    value={hotelSearch.destination}
                    onChange={(e) => setHotelSearch({...hotelSearch, destination: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Check-in Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={hotelSearch.checkIn}
                  onChange={(e) => setHotelSearch({...hotelSearch, checkIn: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Check-out Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={hotelSearch.checkOut}
                  onChange={(e) => setHotelSearch({...hotelSearch, checkOut: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Guests"
                    value={hotelSearch.guests}
                    onChange={(e) => setHotelSearch({...hotelSearch, guests: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="1 Adult">1 Adult</MenuItem>
                    <MenuItem value="2 Adults">2 Adults</MenuItem>
                    <MenuItem value="2 Adults, 1 Child">2 Adults, 1 Child</MenuItem>
                    <MenuItem value="2 Adults, 2 Children">2 Adults, 2 Children</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Price Range"
                    value={hotelSearch.priceRange}
                    onChange={(e) => setHotelSearch({...hotelSearch, priceRange: e.target.value})}
                  >
                    <MenuItem value="Any">Any Price</MenuItem>
                    <MenuItem value="Budget">Budget (₹0 - ₹2000)</MenuItem>
                    <MenuItem value="Economy">Economy (₹2000 - ₹4000)</MenuItem>
                    <MenuItem value="Premium">Premium (₹4000 - ₹7000)</MenuItem>
                    <MenuItem value="Luxury">Luxury (₹7000+)</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Search Hotels
              </Button>
            </Box>
          </form>
        </TabPanel>

        {/* Homestay Search Tab */}
        <TabPanel value={tabValue} index={2}>
          <form onSubmit={handleHomestaySearch}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Destination"
                    value={homestaySearch.destination}
                    onChange={(e) => setHomestaySearch({...homestaySearch, destination: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Check-in Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={homestaySearch.checkIn}
                  onChange={(e) => setHomestaySearch({...homestaySearch, checkIn: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Check-out Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={homestaySearch.checkOut}
                  onChange={(e) => setHomestaySearch({...homestaySearch, checkOut: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Guests"
                    value={homestaySearch.guests}
                    onChange={(e) => setHomestaySearch({...homestaySearch, guests: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="1 Adult">1 Adult</MenuItem>
                    <MenuItem value="2 Adults">2 Adults</MenuItem>
                    <MenuItem value="2 Adults, 1 Child">2 Adults, 1 Child</MenuItem>
                    <MenuItem value="2 Adults, 2 Children">2 Adults, 2 Children</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Property Type"
                    value={homestaySearch.propertyType}
                    onChange={(e) => setHomestaySearch({...homestaySearch, propertyType: e.target.value})}
                  >
                    <MenuItem value="Any">Any Type</MenuItem>
                    <MenuItem value="Villa">Villa</MenuItem>
                    <MenuItem value="Apartment">Apartment</MenuItem>
                    <MenuItem value="Cottage">Cottage</MenuItem>
                    <MenuItem value="Bungalow">Bungalow</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Search Homestays
              </Button>
            </Box>
          </form>
        </TabPanel>

        {/* Train Search Tab */}
        <TabPanel value={tabValue} index={3}>
          <form onSubmit={handleTrainSearch}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="From"
                    value={trainSearch.source}
                    onChange={(e) => setTrainSearch({...trainSearch, source: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton 
                  onClick={() => swapLocations('train')}
                  color="primary"
                  size="large"
                  sx={{ 
                    bgcolor: 'rgba(25, 118, 210, 0.08)', 
                    '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.15)' } 
                  }}
                >
                  <SwapVert />
                </IconButton>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="To"
                    value={trainSearch.destination}
                    onChange={(e) => setTrainSearch({...trainSearch, destination: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Travel Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={trainSearch.date}
                  onChange={(e) => setTrainSearch({...trainSearch, date: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Class"
                    value={trainSearch.class}
                    onChange={(e) => setTrainSearch({...trainSearch, class: e.target.value})}
                  >
                    <MenuItem value="All Classes">All Classes</MenuItem>
                    <MenuItem value="Sleeper">Sleeper (SL)</MenuItem>
                    <MenuItem value="AC 3 Tier">AC 3 Tier (3A)</MenuItem>
                    <MenuItem value="AC 2 Tier">AC 2 Tier (2A)</MenuItem>
                    <MenuItem value="AC First Class">AC First Class (FC)</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Search Trains
              </Button>
            </Box>
          </form>
        </TabPanel>

        {/* Bus Search Tab */}
        <TabPanel value={tabValue} index={4}>
          <form onSubmit={handleBusSearch}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="From"
                    value={busSearch.source}
                    onChange={(e) => setBusSearch({...busSearch, source: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton 
                  onClick={() => swapLocations('bus')}
                  color="primary"
                  size="large"
                  sx={{ 
                    bgcolor: 'rgba(25, 118, 210, 0.08)', 
                    '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.15)' } 
                  }}
                >
                  <SwapVert />
                </IconButton>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="To"
                    value={busSearch.destination}
                    onChange={(e) => setBusSearch({...busSearch, destination: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Travel Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={busSearch.date}
                  onChange={(e) => setBusSearch({...busSearch, date: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Bus Type"
                    value={busSearch.busType}
                    onChange={(e) => setBusSearch({...busSearch, busType: e.target.value})}
                  >
                    <MenuItem value="Any Bus">Any Bus</MenuItem>
                    <MenuItem value="Seater">Seater</MenuItem>
                    <MenuItem value="Sleeper">Sleeper</MenuItem>
                    <MenuItem value="AC Seater">AC Seater</MenuItem>
                    <MenuItem value="AC Sleeper">AC Sleeper</MenuItem>
                    <MenuItem value="Volvo">Volvo</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Search Buses
              </Button>
            </Box>
          </form>
        </TabPanel>

        {/* Cab Search Tab */}
        <TabPanel value={tabValue} index={5}>
          <form onSubmit={handleCabSearch}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Pickup Location"
                    value={cabSearch.source}
                    onChange={(e) => setCabSearch({...cabSearch, source: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Dropoff Location"
                    value={cabSearch.destination}
                    onChange={(e) => setCabSearch({...cabSearch, destination: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Pickup Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={cabSearch.pickupDate}
                  onChange={(e) => setCabSearch({...cabSearch, pickupDate: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Pickup Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  value={cabSearch.pickupTime}
                  onChange={(e) => setCabSearch({...cabSearch, pickupTime: e.target.value})}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Cab Type"
                    value={cabSearch.cabType}
                    onChange={(e) => setCabSearch({...cabSearch, cabType: e.target.value})}
                  >
                    <MenuItem value="All Cabs">All Cabs</MenuItem>
                    <MenuItem value="Mini">Mini (4 Seater)</MenuItem>
                    <MenuItem value="Sedan">Sedan (4 Seater)</MenuItem>
                    <MenuItem value="SUV">SUV (6 Seater)</MenuItem>
                    <MenuItem value="Luxury">Luxury Cars</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Search Cabs
              </Button>
            </Box>
          </form>
        </TabPanel>

        {/* Insurance Search Tab */}
        <TabPanel value={tabValue} index={6}>
          <form onSubmit={handleInsuranceSearch}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Travel Type"
                    value={insuranceSearch.travelType}
                    onChange={(e) => setInsuranceSearch({...insuranceSearch, travelType: e.target.value as 'domestic' | 'international'})}
                  >
                    <MenuItem value="domestic">Domestic</MenuItem>
                    <MenuItem value="international">International</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Travelers"
                    value={insuranceSearch.travelers}
                    onChange={(e) => setInsuranceSearch({...insuranceSearch, travelers: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="1 Adult">1 Adult</MenuItem>
                    <MenuItem value="2 Adults">2 Adults</MenuItem>
                    <MenuItem value="2 Adults, 1 Child">2 Adults, 1 Child</MenuItem>
                    <MenuItem value="2 Adults, 2 Children">2 Adults, 2 Children</MenuItem>
                    <MenuItem value="Family Plan">Family Plan</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={insuranceSearch.startDate}
                  onChange={(e) => setInsuranceSearch({...insuranceSearch, startDate: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Trip Duration"
                    value={insuranceSearch.duration}
                    onChange={(e) => setInsuranceSearch({...insuranceSearch, duration: e.target.value})}
                  >
                    <MenuItem value="7 days">7 days</MenuItem>
                    <MenuItem value="15 days">15 days</MenuItem>
                    <MenuItem value="30 days">30 days</MenuItem>
                    <MenuItem value="45 days">45 days</MenuItem>
                    <MenuItem value="60 days">60 days</MenuItem>
                    <MenuItem value="90 days">90 days</MenuItem>
                    <MenuItem value="180 days">180 days</MenuItem>
                    <MenuItem value="365 days">365 days (Annual)</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Search Insurance Plans
              </Button>
            </Box>
          </form>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default MaterialSearchTabs;