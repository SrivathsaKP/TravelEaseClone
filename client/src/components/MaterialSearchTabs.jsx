import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { popularCities } from '../lib/mockData';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Popper from '@mui/material/Popper';

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
  Person,
  SwapVert,
  BeachAccess,
  CreditCard,
  AccountBalance
} from '@mui/icons-material';
import { format } from 'date-fns';

function TabPanel(props) {
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

function a11yProps(index) {
  return {
    id: `travel-tab-${index}`,
    'aria-controls': `travel-tabpanel-${index}`,
  };
}

const today = format(new Date(), 'yyyy-MM-dd');

// City names to be used for autocomplete in various forms
const cityNames = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa'
];

const MaterialSearchTabs = ({ onTabChange }) => {
  const [tabValue, setTabValue] = useState(0);
  const [, navigate] = useLocation();

  // Flight search state
  const [flightSearch, setFlightSearch] = useState({
    tripType: 'one-way',
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    
    // Call the callback if provided
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  const handleFlightSearch = (e) => {
    e.preventDefault();
    navigate('/flights');
  };

  const handleHotelSearch = (e) => {
    e.preventDefault();
    navigate('/hotels');
  };

  const handleTrainSearch = (e) => {
    e.preventDefault();
    navigate('/trains');
  };

  const handleBusSearch = (e) => {
    e.preventDefault();
    navigate('/buses');
  };

  const swapLocations = (type) => {
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
      <Paper elevation={3} sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        background: 'white',
        mx: { xs: 1, md: 0 }
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            background: '#ffcc00',
            borderRadius: '8px 8px 0 0',
            borderBottom: '1px solid #eaeaea',
            display: 'flex',
            justifyContent: 'space-between',
            '& .MuiTabs-flexContainer': {
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100%'
            },
            '& .MuiTab-root': { 
              color: '#333',
              fontSize: '0.85rem',
              fontWeight: 500,
              p: 1.5,
              flex: 1,
              maxWidth: 'none',
              transition: 'all 0.2s ease',
              textTransform: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderBottom: '3px solid transparent'
            },
            '& .Mui-selected': { 
              color: '#333',
              fontWeight: 700,
              background: '#ffcc00',
              borderBottom: '3px solid #008cff'
            },
            '& .MuiTabs-indicator': { 
              backgroundColor: '#008cff',
              height: 3
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1.5rem',
              marginBottom: '4px'
            }
          }}
        >
          <Tab icon={<FlightTakeoff />} label="Flights" {...a11yProps(0)} />
          <Tab icon={<Hotel />} label="Hotels" {...a11yProps(1)} />
          <Tab 
            icon={<Home />} 
            label={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
                <span>Homestays</span>
                <span style={{ fontSize: '0.7rem' }}>&amp; Villas</span>
              </div>
            } 
            {...a11yProps(2)} 
          />
          <Tab 
            icon={<BeachAccess />} 
            label={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
                <span>Holiday</span>
                <span style={{ fontSize: '0.7rem' }}>Packages</span>
              </div>
            } 
            {...a11yProps(3)} 
          />
          <Tab icon={<Train />} label="Trains" {...a11yProps(4)} />
          <Tab icon={<DirectionsBus />} label="Buses" {...a11yProps(5)} />
          <Tab icon={<LocalTaxi />} label="Cabs" {...a11yProps(6)} />
          <Tab 
            icon={<Security />} 
            label={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
                <span>Travel</span>
                <span style={{ fontSize: '0.7rem' }}>Insurance</span>
              </div>
            } 
            {...a11yProps(7)} 
          />
        </Tabs>

        {/* Flight Search Tab */}
        <TabPanel value={tabValue} index={0}>
          <form onSubmit={handleFlightSearch}>
            <Box sx={{ mb: 3, p: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Box sx={{ mr: 4 }}>
                <RadioGroup
                  row
                  name="tripType"
                  value={flightSearch.tripType}
                  onChange={(e) => setFlightSearch({...flightSearch, tripType: e.target.value})}
                >
                  <FormControlLabel 
                    value="one-way" 
                    control={
                      <Radio sx={{ 
                        color: '#008cff',
                        '&.Mui-checked': {
                          color: '#008cff',
                        } 
                      }}/>
                    } 
                    label="One Way" 
                  />
                  <FormControlLabel 
                    value="round-trip" 
                    control={
                      <Radio sx={{ 
                        color: '#008cff',
                        '&.Mui-checked': {
                          color: '#008cff',
                        } 
                      }}/>
                    } 
                    label="Round Trip" 
                  />
                  <FormControlLabel 
                    value="multi-city" 
                    control={
                      <Radio sx={{ 
                        color: '#008cff',
                        '&.Mui-checked': {
                          color: '#008cff',
                        } 
                      }}/>
                    } 
                    label="Multi City" 
                    disabled
                  />
                </RadioGroup>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <Typography variant="body2" sx={{ mr: 1 }}>Book International and Domestic Flights</Typography>
              </Box>
            </Box>

            <Box sx={{ px: 2, py: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  flex: '1 1 250px',
                  p: 2,
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>FROM</Typography>
                  <FormControl fullWidth sx={{ border: 'none' }}>
                    <Autocomplete
                      value={flightSearch.source ? popularCities.find(city => city.name === flightSearch.source) || null : null}
                      onChange={(e, newValue) => {
                        if (newValue) {
                          setFlightSearch({...flightSearch, source: newValue.name});
                        }
                      }}
                      options={popularCities}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <ListItem {...props} key={option.code}>
                          <ListItemIcon sx={{ minWidth: 35 }}>
                            <FlightTakeoff sx={{ color: '#008cff' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={
                              <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography component="span" sx={{ fontWeight: 'bold' }}>{option.name}</Typography>
                                <Typography component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>({option.code})</Typography>
                              </Box>
                            }
                            secondary={option.airport}
                          />
                        </ListItem>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter city or airport"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <FlightTakeoff sx={{ color: '#008cff' }} />
                              </InputAdornment>
                            ),
                            sx: { 
                              borderRadius: 1, 
                              padding: '4px 8px',
                              background: 'transparent',
                              '& fieldset': { border: 'none' }
                            }
                          }}
                        />
                      )}
                      PopperComponent={props => (
                        <Popper {...props} placement="bottom-start" style={{ width: '350px' }} />
                      )}
                    />
                  </FormControl>
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#008cff' }}>
                    Tap to add a city
                  </Typography>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  p: 2,
                  width: '60px'
                }}>
                  <IconButton 
                    onClick={() => swapLocations('flight')}
                    color="primary"
                    size="medium"
                    sx={{ 
                      bgcolor: 'rgba(0, 140, 255, 0.08)', 
                      color: '#008cff',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.15)' } 
                    }}
                  >
                    <SwapVert />
                  </IconButton>
                </Box>

                <Box sx={{ 
                  flex: '1 1 250px',
                  p: 2,
                  borderLeft: '1px solid #e0e0e0',
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>TO</Typography>
                  <FormControl fullWidth sx={{ border: 'none' }}>
                    <Autocomplete
                      value={flightSearch.destination ? popularCities.find(city => city.name === flightSearch.destination) || null : null}
                      onChange={(e, newValue) => {
                        if (newValue) {
                          setFlightSearch({...flightSearch, destination: newValue.name});
                        }
                      }}
                      options={popularCities}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <ListItem {...props} key={option.code}>
                          <ListItemIcon sx={{ minWidth: 35 }}>
                            <FlightLand sx={{ color: '#008cff' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={
                              <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography component="span" sx={{ fontWeight: 'bold' }}>{option.name}</Typography>
                                <Typography component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>({option.code})</Typography>
                              </Box>
                            }
                            secondary={option.airport}
                          />
                        </ListItem>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter city or airport"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <FlightLand sx={{ color: '#008cff' }} />
                              </InputAdornment>
                            ),
                            sx: { 
                              borderRadius: 1, 
                              padding: '4px 8px',
                              background: 'transparent',
                              '& fieldset': { border: 'none' }
                            }
                          }}
                        />
                      )}
                      PopperComponent={props => (
                        <Popper {...props} placement="bottom-start" style={{ width: '350px' }} />
                      )}
                    />
                  </FormControl>
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#008cff' }}>
                    Tap to add a city
                  </Typography>
                </Box>

                <Box sx={{ 
                  flex: '1 1 180px',
                  p: 2,
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>DEPARTURE</Typography>
                  <TextField
                    type="date"
                    fullWidth
                    value={flightSearch.departureDate}
                    onChange={(e) => setFlightSearch({...flightSearch, departureDate: e.target.value})}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth sx={{ color: '#008cff' }} />
                        </InputAdornment>
                      ),
                      sx: { 
                        borderRadius: 1, 
                        padding: '4px 8px',
                        background: 'transparent',
                        '& fieldset': { border: 'none' }
                      }
                    }}
                  />
                </Box>

                {flightSearch.tripType === 'round-trip' && (
                  <Box sx={{ 
                    flex: '1 1 180px',
                    p: 2,
                    borderRight: '1px solid #e0e0e0',
                    '&:hover': { borderColor: '#008cff' }
                  }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>RETURN</Typography>
                    <TextField
                      type="date"
                      fullWidth
                      value={flightSearch.returnDate}
                      onChange={(e) => setFlightSearch({...flightSearch, returnDate: e.target.value})}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonth sx={{ color: '#008cff' }} />
                          </InputAdornment>
                        ),
                        sx: { 
                          borderRadius: 1, 
                          padding: '4px 8px',
                          background: 'transparent',
                          '& fieldset': { border: 'none' }
                        }
                      }}
                    />
                  </Box>
                )}

                <Box sx={{ 
                  flex: '1 1 180px',
                  p: 2,
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>TRAVELERS & CLASS</Typography>
                  <FormControl fullWidth>
                    <Select
                      value={flightSearch.travelers}
                      onChange={(e) => setFlightSearch({...flightSearch, travelers: e.target.value})}
                      displayEmpty
                      variant="outlined"
                      sx={{ 
                        '& fieldset': { border: 'none' }
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Person sx={{ color: '#008cff' }} />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="1 Adult">1 Adult</MenuItem>
                      <MenuItem value="2 Adults">2 Adults</MenuItem>
                      <MenuItem value="1 Adult, 1 Child">1 Adult, 1 Child</MenuItem>
                      <MenuItem value="2 Adults, 1 Child">2 Adults, 1 Child</MenuItem>
                      <MenuItem value="2 Adults, 2 Children">2 Adults, 2 Children</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: '#008cff', 
                    minWidth: 200,
                    '&:hover': { bgcolor: '#0070cc' } 
                  }}
                >
                  Search Flights
                </Button>
              </Box>
            </Box>
          </form>
        </TabPanel>

        {/* Hotel Search Tab */}
        <TabPanel value={tabValue} index={1}>
          <form onSubmit={handleHotelSearch}>
            <Box sx={{ p: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  flex: '1 1 250px',
                  p: 2,
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>CITY, LOCALITY OR HOTEL</Typography>
                  <FormControl fullWidth>
                    <Autocomplete
                      value={hotelSearch.destination || null}
                      onChange={(e, newValue) => setHotelSearch({...hotelSearch, destination: newValue})}
                      options={cityNames}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter city or hotel"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <Hotel sx={{ color: '#008cff' }} />
                              </InputAdornment>
                            ),
                            sx: { 
                              borderRadius: 1, 
                              padding: '4px 8px',
                              background: 'transparent',
                              '& fieldset': { border: 'none' }
                            }
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Box>

                <Box sx={{ 
                  flex: '1 1 180px',
                  p: 2,
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>CHECK IN</Typography>
                  <TextField
                    type="date"
                    fullWidth
                    value={hotelSearch.checkIn}
                    onChange={(e) => setHotelSearch({...hotelSearch, checkIn: e.target.value})}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth sx={{ color: '#008cff' }} />
                        </InputAdornment>
                      ),
                      sx: { 
                        borderRadius: 1, 
                        padding: '4px 8px',
                        background: 'transparent',
                        '& fieldset': { border: 'none' }
                      }
                    }}
                  />
                </Box>

                <Box sx={{ 
                  flex: '1 1 180px',
                  p: 2,
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>CHECK OUT</Typography>
                  <TextField
                    type="date"
                    fullWidth
                    value={hotelSearch.checkOut}
                    onChange={(e) => setHotelSearch({...hotelSearch, checkOut: e.target.value})}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth sx={{ color: '#008cff' }} />
                        </InputAdornment>
                      ),
                      sx: { 
                        borderRadius: 1, 
                        padding: '4px 8px',
                        background: 'transparent',
                        '& fieldset': { border: 'none' }
                      }
                    }}
                  />
                </Box>

                <Box sx={{ 
                  flex: '1 1 180px',
                  p: 2,
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>GUESTS</Typography>
                  <FormControl fullWidth>
                    <Select
                      value={hotelSearch.guests}
                      onChange={(e) => setHotelSearch({...hotelSearch, guests: e.target.value})}
                      displayEmpty
                      variant="outlined"
                      sx={{ 
                        '& fieldset': { border: 'none' }
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Person sx={{ color: '#008cff' }} />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="1 Adult">1 Adult</MenuItem>
                      <MenuItem value="2 Adults">2 Adults</MenuItem>
                      <MenuItem value="1 Adult, 1 Child">1 Adult, 1 Child</MenuItem>
                      <MenuItem value="2 Adults, 1 Child">2 Adults, 1 Child</MenuItem>
                      <MenuItem value="2 Adults, 2 Children">2 Adults, 2 Children</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: '#008cff', 
                    minWidth: 200,
                    '&:hover': { bgcolor: '#0070cc' } 
                  }}
                >
                  Search Hotels
                </Button>
              </Box>
            </Box>
          </form>
        </TabPanel>

        {/* Trains Search Tab */}
        <TabPanel value={tabValue} index={4}>
          <form onSubmit={handleTrainSearch}>
            <Box sx={{ p: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  flex: '1 1 250px',
                  p: 2,
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>FROM</Typography>
                  <FormControl fullWidth>
                    <Autocomplete
                      value={trainSearch.source || null}
                      onChange={(e, newValue) => setTrainSearch({...trainSearch, source: newValue})}
                      options={cityNames}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter city or station"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <Train sx={{ color: '#008cff' }} />
                              </InputAdornment>
                            ),
                            sx: { 
                              borderRadius: 1, 
                              padding: '4px 8px',
                              background: 'transparent',
                              '& fieldset': { border: 'none' }
                            }
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  p: 2,
                  width: '60px'
                }}>
                  <IconButton 
                    onClick={() => swapLocations('train')}
                    color="primary"
                    size="medium"
                    sx={{ 
                      bgcolor: 'rgba(0, 140, 255, 0.08)', 
                      color: '#008cff',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.15)' } 
                    }}
                  >
                    <SwapVert />
                  </IconButton>
                </Box>

                <Box sx={{ 
                  flex: '1 1 250px',
                  p: 2,
                  borderLeft: '1px solid #e0e0e0',
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>TO</Typography>
                  <FormControl fullWidth>
                    <Autocomplete
                      value={trainSearch.destination || null}
                      onChange={(e, newValue) => setTrainSearch({...trainSearch, destination: newValue})}
                      options={cityNames}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter city or station"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <Train sx={{ color: '#008cff' }} />
                              </InputAdornment>
                            ),
                            sx: { 
                              borderRadius: 1, 
                              padding: '4px 8px',
                              background: 'transparent',
                              '& fieldset': { border: 'none' }
                            }
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Box>

                <Box sx={{ 
                  flex: '1 1 180px',
                  p: 2,
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>TRAVEL DATE</Typography>
                  <TextField
                    type="date"
                    fullWidth
                    value={trainSearch.date}
                    onChange={(e) => setTrainSearch({...trainSearch, date: e.target.value})}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth sx={{ color: '#008cff' }} />
                        </InputAdornment>
                      ),
                      sx: { 
                        borderRadius: 1, 
                        padding: '4px 8px',
                        background: 'transparent',
                        '& fieldset': { border: 'none' }
                      }
                    }}
                  />
                </Box>

                <Box sx={{ 
                  flex: '1 1 180px',
                  p: 2,
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>TRAVEL CLASS</Typography>
                  <FormControl fullWidth>
                    <Select
                      value={trainSearch.class}
                      onChange={(e) => setTrainSearch({...trainSearch, class: e.target.value})}
                      displayEmpty
                      variant="outlined"
                      sx={{ 
                        '& fieldset': { border: 'none' }
                      }}
                    >
                      <MenuItem value="All Classes">All Classes</MenuItem>
                      <MenuItem value="Sleeper">Sleeper</MenuItem>
                      <MenuItem value="AC 3 Tier">AC 3 Tier</MenuItem>
                      <MenuItem value="AC 2 Tier">AC 2 Tier</MenuItem>
                      <MenuItem value="AC First Class">AC First Class</MenuItem>
                      <MenuItem value="Second Sitting">Second Sitting</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: '#008cff', 
                    minWidth: 200,
                    '&:hover': { bgcolor: '#0070cc' } 
                  }}
                >
                  Search Trains
                </Button>
              </Box>
            </Box>
          </form>
        </TabPanel>

        {/* Bus Search Tab */}
        <TabPanel value={tabValue} index={5}>
          <form onSubmit={handleBusSearch}>
            <Box sx={{ p: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  flex: '1 1 250px',
                  p: 2,
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>FROM</Typography>
                  <FormControl fullWidth>
                    <Autocomplete
                      value={busSearch.source || null}
                      onChange={(e, newValue) => setBusSearch({...busSearch, source: newValue})}
                      options={cityNames}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter city or bus stop"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <DirectionsBus sx={{ color: '#008cff' }} />
                              </InputAdornment>
                            ),
                            sx: { 
                              borderRadius: 1, 
                              padding: '4px 8px',
                              background: 'transparent',
                              '& fieldset': { border: 'none' }
                            }
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  p: 2,
                  width: '60px'
                }}>
                  <IconButton 
                    onClick={() => swapLocations('bus')}
                    color="primary"
                    size="medium"
                    sx={{ 
                      bgcolor: 'rgba(0, 140, 255, 0.08)', 
                      color: '#008cff',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.15)' } 
                    }}
                  >
                    <SwapVert />
                  </IconButton>
                </Box>

                <Box sx={{ 
                  flex: '1 1 250px',
                  p: 2,
                  borderLeft: '1px solid #e0e0e0',
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>TO</Typography>
                  <FormControl fullWidth>
                    <Autocomplete
                      value={busSearch.destination || null}
                      onChange={(e, newValue) => setBusSearch({...busSearch, destination: newValue})}
                      options={cityNames}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter city or bus stop"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <DirectionsBus sx={{ color: '#008cff' }} />
                              </InputAdornment>
                            ),
                            sx: { 
                              borderRadius: 1, 
                              padding: '4px 8px',
                              background: 'transparent',
                              '& fieldset': { border: 'none' }
                            }
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Box>

                <Box sx={{ 
                  flex: '1 1 180px',
                  p: 2,
                  borderRight: '1px solid #e0e0e0',
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>TRAVEL DATE</Typography>
                  <TextField
                    type="date"
                    fullWidth
                    value={busSearch.date}
                    onChange={(e) => setBusSearch({...busSearch, date: e.target.value})}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth sx={{ color: '#008cff' }} />
                        </InputAdornment>
                      ),
                      sx: { 
                        borderRadius: 1, 
                        padding: '4px 8px',
                        background: 'transparent',
                        '& fieldset': { border: 'none' }
                      }
                    }}
                  />
                </Box>

                <Box sx={{ 
                  flex: '1 1 180px',
                  p: 2,
                  '&:hover': { borderColor: '#008cff' }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>BUS TYPE</Typography>
                  <FormControl fullWidth>
                    <Select
                      value={busSearch.busType}
                      onChange={(e) => setBusSearch({...busSearch, busType: e.target.value})}
                      displayEmpty
                      variant="outlined"
                      sx={{ 
                        '& fieldset': { border: 'none' }
                      }}
                    >
                      <MenuItem value="Any Bus">Any Bus</MenuItem>
                      <MenuItem value="Sleeper">Sleeper</MenuItem>
                      <MenuItem value="AC">AC</MenuItem>
                      <MenuItem value="Non-AC">Non-AC</MenuItem>
                      <MenuItem value="Volvo">Volvo</MenuItem>
                      <MenuItem value="Deluxe">Deluxe</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: '#008cff', 
                    minWidth: 200,
                    '&:hover': { bgcolor: '#0070cc' } 
                  }}
                >
                  Search Buses
                </Button>
              </Box>
            </Box>
          </form>
        </TabPanel>

      </Paper>
    </Container>
  );
};

export default MaterialSearchTabs;