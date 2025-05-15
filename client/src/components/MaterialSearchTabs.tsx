import React, { useState, useEffect, useRef } from 'react';
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
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Popper from '@mui/material/Popper';
import { popularCities } from '../lib/mockData';
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
  SwapVert,
  BeachAccess,
  CreditCard,
  AccountBalance
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

interface MaterialSearchTabsProps {
  onTabChange?: (selectedTab: number) => void;
}

const MaterialSearchTabs: React.FC<MaterialSearchTabsProps> = ({ onTabChange }) => {
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
    
    // Call the callback if provided
    if (onTabChange) {
      onTabChange(newValue);
    }
    
    // Reset state values for the selected tab
    switch(newValue) {
      case 0: // Flights
        setFlightSearch({
          ...flightSearch,
          source: flightSearch.source || '',
          destination: flightSearch.destination || ''
        });
        break;
      case 1: // Hotels
        setHotelSearch({
          ...hotelSearch,
          destination: hotelSearch.destination || ''
        });
        break;
      case 2: // Homestays
        setHomestaySearch({
          ...homestaySearch,
          destination: homestaySearch.destination || ''
        });
        break;
      case 3: // Trains
        setTrainSearch({
          ...trainSearch,
          source: trainSearch.source || '',
          destination: trainSearch.destination || ''
        });
        break;
      case 4: // Buses
        setBusSearch({
          ...busSearch,
          source: busSearch.source || '',
          destination: busSearch.destination || ''
        });
        break;
      case 5: // Cabs
        setCabSearch({
          ...cabSearch,
          source: cabSearch.source || '',
          destination: cabSearch.destination || ''
        });
        break;
      case 6: // Insurance
        setInsuranceSearch({
          ...insuranceSearch
        });
        break;
    }
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
  
  // Available cities for source/destination dropdowns in other tabs
  const cities = popularCities.map(city => city.name);

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
              background: '#ffcc00'
            },
            '& .MuiTabs-indicator': { 
              display: 'none'
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
          <Tab icon={<CreditCard />} label="Visa" {...a11yProps(7)} />
          <Tab 
            icon={<AccountBalance />} 
            label={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
                <span>Forex Card</span>
                <span style={{ fontSize: '0.7rem' }}>&amp; Currency</span>
              </div>
            } 
            {...a11yProps(8)} 
          />
          <Tab 
            icon={<Security />} 
            label={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
                <span>Travel</span>
                <span style={{ fontSize: '0.7rem' }}>Insurance</span>
              </div>
            } 
            {...a11yProps(9)} 
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
                  onChange={(e) => setFlightSearch({...flightSearch, tripType: e.target.value as 'one-way' | 'round-trip'})}
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
                                border: 'none',
                                '& fieldset': { border: 'none' }
                              }
                            }}
                            sx={{
                              '& .MuiInputBase-input': {
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                padding: '0 !important',
                                paddingLeft: '0 !important'
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
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
                </Grid>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  px: 2
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
                                border: 'none',
                                '& fieldset': { border: 'none' }
                              }
                            }}
                            sx={{
                              '& .MuiInputBase-input': {
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                padding: '0 !important',
                                paddingLeft: '0 !important'
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
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
                </Grid>

                <Grid item xs={12} md={2}>
                  <Box sx={{ 
                    p: 2, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1,
                    '&:hover': { borderColor: '#008cff' }
                  }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>DEPARTURE</Typography>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={flightSearch.departureDate}
                      onChange={(e) => setFlightSearch({...flightSearch, departureDate: e.target.value})}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonth sx={{ color: '#008cff' }} />
                          </InputAdornment>
                        ),
                        sx: {
                          border: 'none',
                          '& fieldset': { border: 'none' }
                        }
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          padding: '0 !important',
                          paddingLeft: '0 !important'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none'
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                      Saturday
                    </Typography>
                  </Box>
                </Grid>

                {flightSearch.tripType === 'round-trip' && (
                  <Grid item xs={12} md={2}>
                    <Box sx={{ 
                      p: 2, 
                      border: '1px solid #e0e0e0', 
                      borderRadius: 1,
                      '&:hover': { borderColor: '#008cff' }
                    }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>RETURN</Typography>
                      <TextField
                        fullWidth
                        type="date"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={flightSearch.returnDate}
                        onChange={(e) => setFlightSearch({...flightSearch, returnDate: e.target.value})}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonth sx={{ color: '#008cff' }} />
                            </InputAdornment>
                          ),
                          sx: {
                            border: 'none',
                            '& fieldset': { border: 'none' }
                          }
                        }}
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            padding: '0 !important',
                            paddingLeft: '0 !important'
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                          }
                        }}
                      />
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', mt: 0.5, color: '#008cff' }}>
                        Tap to add a return date
                      </Typography>
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12} md={flightSearch.tripType === 'one-way' ? 3 : 2}>
                  <Box sx={{ 
                    p: 2, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1,
                    '&:hover': { borderColor: '#008cff' },
                    height: '100%'
                  }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>TRAVELLERS & CLASS</Typography>
                    <FormControl fullWidth sx={{ border: 'none' }}>
                      <TextField
                        select
                        value={flightSearch.travelers}
                        onChange={(e) => setFlightSearch({...flightSearch, travelers: e.target.value})}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person sx={{ color: '#008cff' }} />
                            </InputAdornment>
                          ),
                          sx: {
                            border: 'none',
                            '& fieldset': { border: 'none' }
                          }
                        }}
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              style: {
                                maxHeight: 300
                              }
                            }
                          }
                        }}
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            padding: '0 !important',
                            paddingLeft: '0 !important'
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                          }
                        }}
                      >
                        <MenuItem value="1 Adult">1 Adult</MenuItem>
                        <MenuItem value="2 Adults">2 Adults</MenuItem>
                        <MenuItem value="1 Adult, 1 Child">1 Adult, 1 Child</MenuItem>
                        <MenuItem value="2 Adults, 1 Child">2 Adults, 1 Child</MenuItem>
                        <MenuItem value="2 Adults, 2 Children">2 Adults, 2 Children</MenuItem>
                      </TextField>
                    </FormControl>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                      Economy/Premium Economy
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Radio
                        sx={{ 
                          color: '#008cff',
                          '&.Mui-checked': {
                            color: '#008cff',
                          } 
                        }}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        Student
                        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                          Extra discounts/baggage
                        </Typography>
                      </Typography>
                    }
                  />
                  
                  <FormControlLabel
                    control={
                      <Radio
                        sx={{ 
                          color: '#008cff',
                          '&.Mui-checked': {
                            color: '#008cff',
                          } 
                        }}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        Senior Citizen
                        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                          Up to ₹600 off
                        </Typography>
                      </Typography>
                    }
                  />
                  
                  <FormControlLabel
                    control={
                      <Radio
                        sx={{ 
                          color: '#008cff',
                          '&.Mui-checked': {
                            color: '#008cff',
                          } 
                        }}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        Armed Forces
                        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                          Up to ₹300 off
                        </Typography>
                      </Typography>
                    }
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 32,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  backgroundColor: '#008cff',
                  '&:hover': { backgroundColor: '#0070ce' }
                }}
              >
                SEARCH
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
                  borderRadius: 28,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  bgcolor: '#2196f3',
                  '&:hover': { bgcolor: '#1976d2' }
                }}
              >
                SEARCH
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
                  borderRadius: 28,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  bgcolor: '#2196f3',
                  '&:hover': { bgcolor: '#1976d2' }
                }}
              >
                SEARCH
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
                  borderRadius: 28,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  bgcolor: '#2196f3',
                  '&:hover': { bgcolor: '#1976d2' }
                }}
              >
                SEARCH
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
                  borderRadius: 28,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  bgcolor: '#2196f3',
                  '&:hover': { bgcolor: '#1976d2' }
                }}
              >
                SEARCH
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
                  borderRadius: 28,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  bgcolor: '#2196f3',
                  '&:hover': { bgcolor: '#1976d2' }
                }}
              >
                SEARCH
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
                  borderRadius: 28,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  bgcolor: '#2196f3',
                  '&:hover': { bgcolor: '#1976d2' }
                }}
              >
                SEARCH
              </Button>
            </Box>
          </form>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default MaterialSearchTabs;