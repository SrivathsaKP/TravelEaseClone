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
  Grid,
  Rating,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { Bus } from '@/lib/types';
import { selectBusSearch, setBusSearch } from '@/store/searchSlice';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';

// City options for the dropdown
const cityOptions = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa'
];

// Bus types
const busTypes = ['All', 'AC', 'Non-AC', 'Sleeper', 'Seater'];

// Departure time slots
const departureTimeSlots = [
  { label: 'Before 6 AM', value: 'before_6am' },
  { label: '6 AM - 12 PM', value: '6am_12pm' },
  { label: '12 PM - 6 PM', value: '12pm_6pm' },
  { label: 'After 6 PM', value: 'after_6pm' }
];

const BusSearchPage = () => {
  const dispatch = useDispatch();
  const busSearchParams = useSelector(selectBusSearch);
  
  // State for bus search results
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State for form fields
  const [source, setSource] = useState(busSearchParams.source || 'Mumbai');
  const [destination, setDestination] = useState(busSearchParams.destination || 'Delhi');
  const [date, setDate] = useState(busSearchParams.date || dayjs().format('YYYY-MM-DD'));
  const [busType, setBusType] = useState(busSearchParams.busType || 'All');
  const [departureTime, setDepartureTime] = useState(busSearchParams.departureTime || 'all');
  
  // Handle form submission
  const handleSearch = () => {
    setLoading(true);
    
    // Update Redux store with current search parameters
    dispatch(setBusSearch({
      source,
      destination,
      date,
      travelers: 1, // Default to 1 traveler
      busType,
      departureTime
    }));
    
    // Fetch bus results
    fetchBuses();
  };
  
  // Swap source and destination
  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };
  
  // Fetch buses from API
  const fetchBuses = async () => {
    try {
      // Always fetch the default buses for any search parameters for demonstration
      const response = await fetch(`/api/buses/search?source=${source}&destination=${destination}&date=${date}`);
      const responseData = await response.json();
      
      console.log("Bus search API response:", responseData);
      
      // Handle different API response formats
      if (responseData.success && Array.isArray(responseData.data)) {
        setBuses(responseData.data);
      } else if (responseData.data && Array.isArray(responseData.data)) {
        setBuses(responseData.data);
      } else if (Array.isArray(responseData)) {
        setBuses(responseData);
      } else {
        console.warn("Unexpected API response format:", responseData);
        setBuses([]);
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
      setBuses([]);
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
  
  // Format duration (minutes to hours and minutes)
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Calculate arrival time
  const calculateArrivalTime = (departureTime: string, durationMinutes: number) => {
    const departure = dayjs(`2023-01-01 ${departureTime}`);
    const arrival = departure.add(durationMinutes, 'minute');
    return arrival.format('HH:mm');
  };
  
  // Load buses on mount with default values
  useEffect(() => {
    handleSearch();
  }, []);
  
  // Column definitions for the DataGrid
  const columns: GridColDef[] = [
    {
      field: 'operator',
      headerName: 'Bus Operator',
      width: 220,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.busType} • {params.row.busModel}
          </Typography>
        </Box>
      )
    },
    {
      field: 'departureTime',
      headerName: 'Departure',
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {formatTime(params.value)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.departurePoint}
          </Typography>
        </Box>
      )
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            {formatDuration(params.row.durationMinutes)}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            mt: 0.5
          }}>
            <Box sx={{ 
              height: '2px', 
              width: '80%', 
              bgcolor: '#e0e0e0',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '-3px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                bgcolor: '#008cff'
              },
              '&::before': {
                left: 0
              },
              '&::after': {
                right: 0
              }
            }}/>
          </Box>
        </Box>
      )
    },
    {
      field: 'arrivalTime',
      headerName: 'Arrival',
      width: 160,
      renderCell: (params: GridRenderCellParams) => {
        const displayTime = params.value 
          ? formatTime(params.value)
          : params.row.durationMinutes 
            ? formatTime(calculateArrivalTime(params.row.departureTime, params.row.durationMinutes))
            : "N/A";
        
        return (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {displayTime}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.arrivalPoint}
            </Typography>
          </Box>
        );
      }
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Rating 
            value={params.value} 
            readOnly 
            precision={0.5}
            size="small" 
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {params.row.reviewCount} reviews
          </Typography>
        </Box>
      )
    },
    {
      field: 'availableSeats',
      headerName: 'Seats',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {params.value} seats
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: params.value > 10 ? 'success.main' : params.value > 5 ? 'warning.main' : 'error.main',
              display: 'block'
            }}
          >
            {params.value > 10 ? 'Available' : params.value > 5 ? 'Filling fast' : 'Few left'}
          </Typography>
        </Box>
      )
    },
    {
      field: 'fare',
      headerName: 'Fare',
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
          Select Seats
        </Button>
      )
    }
  ];
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Search form */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Search Buses
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start' }}>
          {/* Source */}
          <Box sx={{ flex: '1 1 200px', minWidth: '200px', position: 'relative' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>FROM</InputLabel>
              <Select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                label="FROM"
                startAdornment={<LocationOnIcon sx={{ color: 'text.secondary', mr: 1 }} />}
              >
                {cityOptions.map((cityOption) => (
                  <MenuItem key={cityOption} value={cityOption}>{cityOption}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            {/* Swap button */}
            <Box
              sx={{
                position: 'absolute',
                right: -16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10
              }}
            >
              <Button
                sx={{
                  minWidth: 32,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: '#fff',
                  border: '1px solid #e0e0e0',
                  boxShadow: 1,
                  color: '#008cff',
                  '&:hover': {
                    bgcolor: '#f5f5f5'
                  }
                }}
                onClick={handleSwap}
              >
                <SwapVertIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
          
          {/* Destination */}
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>TO</InputLabel>
              <Select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                label="TO"
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
                label="Travel Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
                InputProps={{
                  startAdornment: <CalendarMonthIcon sx={{ color: 'text.secondary', mr: 1 }} />
                }}
              />
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'SEARCH BUSES'}
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
                <Typography variant="subtitle2">Departure Time</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {departureTimeSlots.map((slot) => (
                  <Box 
                    key={slot.value}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      py: 0.5,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.04)' }
                    }}
                    onClick={() => setDepartureTime(slot.value === departureTime ? 'all' : slot.value)}
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
                      {departureTime === slot.value && (
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
                      {slot.label}
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
                <Typography variant="subtitle2">Bus Type</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {busTypes.map((type) => (
                  <Box 
                    key={type}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      py: 0.5,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.04)' }
                    }}
                    onClick={() => setBusType(type === busType ? 'All' : type)}
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
                      {busType === type && (
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
                <Typography variant="subtitle2">Boarding Point</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {['Central Bus Stand', 'Airport', 'Railway Station', 'City Center'].map((point) => (
                  <Box 
                    key={point}
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
                      {point}
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
          ) : buses.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>No buses found</Typography>
              <Typography variant="body2" color="text.secondary">
                Try changing your search parameters or select a different date.
              </Typography>
            </Paper>
          ) : (
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {source} to {destination}: {buses.length} buses found
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {dayjs(date).format('ddd, MMM D, YYYY')}
              </Typography>
              
              <Paper elevation={2} sx={{ overflow: 'hidden', mt: 2 }}>
                <DataGrid
                  rows={buses}
                  columns={columns}
                  autoHeight
                  hideFooter={buses.length <= 10}
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
              
              {/* Popular bus operators */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Popular Bus Operators
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {['Volvo Bus Service', 'Express Travels', 'Luxury Cruiser', 'City Connect'].map((operator, index) => (
                    <Card 
                      key={operator}
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
                          <DirectionsBusIcon 
                            sx={{ 
                              color: '#008cff',
                              mr: 1,
                              fontSize: '2rem'
                            }} 
                          />
                          <Typography variant="subtitle1" fontWeight="bold">
                            {operator}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Rating
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating value={4.5 - index * 0.5} precision={0.5} readOnly size="small" />
                            <Typography variant="body2" ml={0.5}>
                              {(4.5 - index * 0.5).toFixed(1)}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Fare
                          </Typography>
                          <Typography variant="body2" fontWeight="bold" color="#008cff">
                            ₹{(800 + index * 200).toLocaleString()} onwards
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            Bus Types
                          </Typography>
                          <Typography variant="body2">
                            AC, Sleeper
                          </Typography>
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

export default BusSearchPage;