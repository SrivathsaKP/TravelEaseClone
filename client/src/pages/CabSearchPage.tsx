import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Divider,
  Rating,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { Cab } from '@/lib/types';
import { selectCabSearch, setCabSearch } from '@/store/searchSlice';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import TimeIcon from '@mui/icons-material/AccessTime';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CarRentalIcon from '@mui/icons-material/CarRental';
import LuggageIcon from '@mui/icons-material/Luggage';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import dayjs from 'dayjs';

// City options for the dropdown
const cityOptions = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa'
];

// Cab types
const cabTypes = ['All', 'Sedan', 'SUV', 'Hatchback', 'Luxury', 'Mini'];

// Time slots
const timeSlots = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', 
  '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', 
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', 
  '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
];

const CabSearchPage = () => {
  const dispatch = useDispatch();
  const cabSearchParams = useSelector(selectCabSearch);
  
  // State for cab search results
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State for form fields
  const [city, setCity] = useState(cabSearchParams.city || 'Mumbai');
  const [pickupDate, setPickupDate] = useState(cabSearchParams.pickupDate || dayjs().format('YYYY-MM-DD'));
  const [pickupTime, setPickupTime] = useState(cabSearchParams.pickupTime || '10:00');
  const [cabType, setCabType] = useState(cabSearchParams.cabType || 'All');
  
  // Handle form submission
  const handleSearch = () => {
    setLoading(true);
    
    // Update Redux store with current search parameters
    dispatch(setCabSearch({
      city,
      pickupDate,
      pickupTime,
      cabType
    }));
    
    // Fetch cab results
    fetchCabs();
  };
  
  // Fetch cabs from API
  const fetchCabs = async () => {
    try {
      // Always fetch the default cabs for any search parameters for demonstration
      const response = await fetch(`/api/cabs/search?cityOrLocation=${city}&pickupDate=${pickupDate}`);
      const responseData = await response.json();
      
      console.log("Cab search API response:", responseData);
      
      // Handle different API response formats
      if (responseData.success && Array.isArray(responseData.data)) {
        setCabs(responseData.data);
      } else if (responseData.data && Array.isArray(responseData.data)) {
        setCabs(responseData.data);
      } else if (Array.isArray(responseData)) {
        setCabs(responseData);
      } else {
        console.warn("Unexpected API response format:", responseData);
        setCabs([]);
      }
    } catch (error) {
      console.error("Error fetching cabs:", error);
      setCabs([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Format time (24hr to 12hr)
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };
  
  // Load cabs on mount with default values
  useEffect(() => {
    handleSearch();
  }, []);
  
  // Column definitions for the DataGrid
  const columns: GridColDef[] = [
    {
      field: 'type',
      headerName: 'Cab Type',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.provider}
          </Typography>
        </Box>
      )
    },
    {
      field: 'model',
      headerName: 'Car Model',
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.capacity} Seater
          </Typography>
        </Box>
      )
    },
    {
      field: 'features',
      headerName: 'Included',
      width: 220,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {params.value.map((feature: string, index: number) => (
            <Chip 
              key={index}
              label={feature}
              size="small"
              sx={{ 
                height: '20px',
                fontSize: '0.7rem',
                bgcolor: 'rgba(0, 140, 255, 0.08)',
                color: '#008cff'
              }}
            />
          ))}
        </Box>
      )
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Rating 
            value={params.value} 
            readOnly 
            precision={0.5}
            size="small" 
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {params.row.reviews} reviews
          </Typography>
        </Box>
      )
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#008cff' }}>
            ₹{params.value}
          </Typography>
          {Math.random() > 0.6 && (
            <Chip
              label="Deal"
              size="small"
              icon={<LocalOfferIcon sx={{ fontSize: '0.8rem' }} />}
              sx={{ 
                height: '20px',
                fontSize: '0.7rem',
                bgcolor: 'rgba(0, 140, 255, 0.08)',
                color: '#008cff',
                '.MuiChip-icon': { color: '#008cff' }
              }}
            />
          )}
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: '',
      width: 120,
      renderCell: () => (
        <Button
          variant="contained"
          size="small"
          sx={{ 
            bgcolor: '#008cff', 
            '&:hover': { bgcolor: '#0071ce' },
            fontSize: '0.75rem',
            whiteSpace: 'nowrap'
          }}
        >
          Book Now
        </Button>
      )
    }
  ];
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Search form */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Cabs & Car Rentals
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start' }}>
          {/* City */}
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>CITY</InputLabel>
              <Select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="CITY"
                startAdornment={<LocationOnIcon sx={{ color: 'text.secondary', mr: 1 }} />}
              >
                {cityOptions.map((cityOption) => (
                  <MenuItem key={cityOption} value={cityOption}>{cityOption}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          {/* Date */}
          <Box sx={{ flex: '1 1 170px', minWidth: '170px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <TextField
                type="date"
                label="Pickup Date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
                InputProps={{
                  startAdornment: <CalendarMonthIcon sx={{ color: 'text.secondary', mr: 1 }} />
                }}
              />
            </FormControl>
          </Box>
          
          {/* Time */}
          <Box sx={{ flex: '1 1 170px', minWidth: '170px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Pickup Time</InputLabel>
              <Select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                label="Pickup Time"
                startAdornment={<TimeIcon sx={{ color: 'text.secondary', mr: 1 }} />}
              >
                {timeSlots.map((time) => (
                  <MenuItem key={time} value={time}>{formatTime(time)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          {/* Cab Type */}
          <Box sx={{ flex: '1 1 170px', minWidth: '170px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Cab Type</InputLabel>
              <Select
                value={cabType}
                onChange={(e) => setCabType(e.target.value)}
                label="Cab Type"
                startAdornment={<LocalTaxiIcon sx={{ color: 'text.secondary', mr: 1 }} />}
              >
                {cabTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          {/* Search Button */}
          <Box sx={{ flex: '0 0 130px' }}>
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
              startIcon={!loading && <SearchIcon />}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'SEARCH CABS'}
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {/* Results */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Filters */}
        <Box sx={{ width: 280 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              FILTERS
            </Typography>
            
            <Accordion defaultExpanded elevation={0} sx={{ '&::before': { display: 'none' } }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 0 }}
              >
                <Typography variant="subtitle2">Car Type</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {cabTypes.map((type) => (
                  <Box 
                    key={type}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      py: 0.5,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.04)' }
                    }}
                    onClick={() => setCabType(type === cabType ? 'All' : type)}
                  >
                    <Box 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        borderRadius: '50%', 
                        border: '1px solid #ccc',
                        mr: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {cabType === type && (
                        <Box 
                          sx={{ 
                            width: 10, 
                            height: 10, 
                            borderRadius: '50%', 
                            bgcolor: '#008cff' 
                          }} 
                        />
                      )}
                    </Box>
                    <Typography variant="body2">
                      {type}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
            
            <Divider />
            
            <Accordion defaultExpanded elevation={0} sx={{ '&::before': { display: 'none' } }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 0 }}
              >
                <Typography variant="subtitle2">Price Range</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {['₹500 - ₹1000', '₹1000 - ₹2000', '₹2000 - ₹3000', '₹3000+'].map((range) => (
                  <Box 
                    key={range}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      py: 0.5,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.04)' }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        borderRadius: '3px', 
                        border: '1px solid #ccc',
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2">
                      {range}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
            
            <Divider />
            
            <Accordion defaultExpanded elevation={0} sx={{ '&::before': { display: 'none' } }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 0 }}
              >
                <Typography variant="subtitle2">Car Features</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {['AC', 'Luggage Space', 'Music System', 'Child Seat', 'GPS'].map((feature) => (
                  <Box 
                    key={feature}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      py: 0.5,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.04)' }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        borderRadius: '3px', 
                        border: '1px solid #ccc',
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2">
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Box>
        
        {/* Results */}
        <Box sx={{ flex: 1 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : cabs.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>No cabs found</Typography>
              <Typography variant="body2" color="text.secondary">
                Try changing your search parameters or select a different date or time.
              </Typography>
            </Paper>
          ) : (
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Cabs in {city}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {dayjs(pickupDate).format('ddd, MMM D, YYYY')} at {formatTime(pickupTime)}
              </Typography>
              
              <Paper elevation={2} sx={{ overflow: 'hidden', mt: 2 }}>
                <DataGrid
                  rows={cabs}
                  columns={columns}
                  autoHeight
                  hideFooter={cabs.length <= 10}
                  checkboxSelection={false}
                  pagination={true}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10 } }
                  }}
                  disableRowSelectionOnClick
                  getRowHeight={() => 'auto'}
                  sx={{
                    '& .MuiDataGrid-cell': {
                      py: 1,
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-row:hover': {
                      bgcolor: 'rgba(0, 140, 255, 0.04)',
                    }
                  }}
                  slots={{
                    toolbar: GridToolbar,
                  }}
                />
              </Paper>
              
              {/* Popular cab services */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Popular Cab Services
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {['City Rides', 'Airport Transfer', 'Hourly Rental', 'Outstation'].map((service, index) => (
                    <Card 
                      key={service}
                      sx={{ 
                        width: 280,
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { 
                          transform: 'translateY(-4px)',
                          boxShadow: 3 
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          {index === 0 ? <DirectionsCarIcon sx={{ color: '#008cff', mr: 1, fontSize: '2rem' }} /> :
                           index === 1 ? <AirportShuttleIcon sx={{ color: '#008cff', mr: 1, fontSize: '2rem' }} /> :
                           index === 2 ? <CarRentalIcon sx={{ color: '#008cff', mr: 1, fontSize: '2rem' }} /> :
                           <LocalTaxiIcon sx={{ color: '#008cff', mr: 1, fontSize: '2rem' }} />}
                          <Typography variant="subtitle1" fontWeight="bold">
                            {service}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" mb={1.5}>
                          {index === 0 ? 'Get around the city with ease' : 
                           index === 1 ? 'Hassle-free airport transfers' :
                           index === 2 ? 'Rent by hour for flexibility' :
                           'Travel between cities comfortably'}
                        </Typography>
                        
                        <Divider sx={{ my: 1 }} />
                        
                        <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                          Features
                        </Typography>
                        
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AcUnitIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              AC Cars
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LuggageIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              Luggage Space
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default CabSearchPage;