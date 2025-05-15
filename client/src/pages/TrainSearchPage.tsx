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
import { Train } from '@/lib/types';
import { selectTrainSearch, setTrainSearch } from '@/store/searchSlice';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import TrainIcon from '@mui/icons-material/Train';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WifiIcon from '@mui/icons-material/Wifi';
import PowerIcon from '@mui/icons-material/Power';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import dayjs from 'dayjs';

// City options for the dropdown
const cityOptions = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa'
];

// Train types
const trainTypes = ['All', 'Shatabdi', 'Rajdhani', 'Duronto', 'Superfast', 'Express', 'Passenger'];

// Train classes
const trainClasses = ['All Classes', 'Sleeper (SL)', '3rd AC (3A)', '2nd AC (2A)', '1st AC (1A)', 'Chair Car (CC)', 'Executive Chair Car (EC)'];

const TrainSearchPage = () => {
  const dispatch = useDispatch();
  const trainSearchParams = useSelector(selectTrainSearch);
  
  // State for train search results
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State for form fields
  const [source, setSource] = useState(trainSearchParams.source || 'Mumbai');
  const [destination, setDestination] = useState(trainSearchParams.destination || 'Delhi');
  const [date, setDate] = useState(trainSearchParams.date || dayjs().format('YYYY-MM-DD'));
  const [trainClass, setTrainClass] = useState(trainSearchParams.trainClass || 'All Classes');
  const [trainType, setTrainType] = useState(trainSearchParams.trainType || 'All');
  
  // Handle form submission
  const handleSearch = () => {
    setLoading(true);
    
    // Update Redux store with current search parameters
    dispatch(setTrainSearch({
      source,
      destination,
      date,
      class: trainClass, // Set class parameter from trainClass
      travelers: 1, // Default to 1 traveler
      trainClass,
      trainType
    }));
    
    // Fetch train results
    fetchTrains();
  };
  
  // Swap source and destination
  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };
  
  // Fetch trains from API
  const fetchTrains = async () => {
    try {
      const response = await fetch(`/api/trains/search?source=${source}&destination=${destination}&date=${date}`);
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setTrains(data);
      } else {
        setTrains([]);
      }
    } catch (error) {
      console.error("Error fetching trains:", error);
      setTrains([]);
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
  
  // Load trains on mount with default values
  useEffect(() => {
    handleSearch();
  }, []);
  
  // Column definitions for the DataGrid
  const columns: GridColDef[] = [
    {
      field: 'trainNumber',
      headerName: 'Train Number',
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {params.row.trainNumber}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.trainName}
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
            {params.row.source}
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
              {params.row.destination}
            </Typography>
          </Box>
        );
      }
    },
    {
      field: 'availability',
      headerName: 'Availability',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const availStatus = params.value.toLowerCase();
        
        return (
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 'bold',
                color: availStatus.includes('available') 
                  ? 'success.main' 
                  : availStatus.includes('wait') 
                    ? 'warning.main' 
                    : 'error.main'
              }}
            >
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.classes.join(', ')}
            </Typography>
          </Box>
        );
      }
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
          Search Trains
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
          
          {/* Train Class */}
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Class</InputLabel>
              <Select
                value={trainClass}
                onChange={(e) => setTrainClass(e.target.value)}
                label="Class"
              >
                {trainClasses.map((classOption) => (
                  <MenuItem key={classOption} value={classOption}>{classOption}</MenuItem>
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'SEARCH TRAINS'}
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
                <Typography variant="subtitle2">Train Type</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {trainTypes.map((type) => (
                  <Box 
                    key={type}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      py: 0.5,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.04)' }
                    }}
                    onClick={() => setTrainType(type === trainType ? 'All' : type)}
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
                      {trainType === type && (
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
                <Typography variant="subtitle2">Departure Time</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {['Early Morning (12:00 AM - 6:00 AM)', 'Morning (6:00 AM - 12:00 PM)', 
                  'Afternoon (12:00 PM - 6:00 PM)', 'Evening (6:00 PM - 12:00 AM)'].map((time) => (
                  <Box 
                    key={time}
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
                      {time}
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
                <Typography variant="subtitle2">Journey Duration</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {['< 6 hours', '6 - 12 hours', '12 - 18 hours', '> 18 hours'].map((duration) => (
                  <Box 
                    key={duration}
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
                      {duration}
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
          ) : trains.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>No trains found</Typography>
              <Typography variant="body2" color="text.secondary">
                Try changing your search parameters or select a different date.
              </Typography>
            </Paper>
          ) : (
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {source} to {destination}: {trains.length} trains found
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {dayjs(date).format('ddd, MMM D, YYYY')}
              </Typography>
              
              <Paper elevation={2} sx={{ overflow: 'hidden', mt: 2 }}>
                <DataGrid
                  rows={trains}
                  columns={columns}
                  autoHeight
                  hideFooter={trains.length <= 10}
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
              
              {/* Popular Trains */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Premium Trains
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {['Rajdhani Express', 'Shatabdi Express', 'Vande Bharat', 'Tejas Express'].map((train, index) => (
                    <Card 
                      key={train}
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
                          <TrainIcon 
                            sx={{ 
                              color: '#008cff',
                              mr: 1,
                              fontSize: '2rem'
                            }} 
                          />
                          <Typography variant="subtitle1" fontWeight="bold">
                            {train}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" mb={1.5}>
                          {['High-speed', 'Premium coaches', 'Executive class', 'Dynamic pricing'][index]}
                        </Typography>
                        
                        <Divider sx={{ my: 1 }} />
                        
                        <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                          Amenities
                        </Typography>
                        
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <RestaurantIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              Catering
                            </Typography>
                            <CheckCircleIcon sx={{ color: 'success.main', fontSize: '0.9rem', ml: 0.5 }} />
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WifiIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              WiFi
                            </Typography>
                            {index < 2 && <CheckCircleIcon sx={{ color: 'success.main', fontSize: '0.9rem', ml: 0.5 }} />}
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PowerIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              Power Outlets
                            </Typography>
                            <CheckCircleIcon sx={{ color: 'success.main', fontSize: '0.9rem', ml: 0.5 }} />
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

export default TrainSearchPage;