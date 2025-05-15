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
  Rating
} from '@mui/material';
import { Hotel } from '@/lib/types';
import { selectHotelSearch, setHotelSearch } from '@/store/searchSlice';
import HotelResults from '@/components/HotelResults';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';

// City options for the dropdown
const cityOptions = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa'
];

const HotelSearchPage = () => {
  const dispatch = useDispatch();
  const hotelSearchParams = useSelector(selectHotelSearch);
  
  // State for hotel search results
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State for form fields
  const [city, setCity] = useState(hotelSearchParams.city || 'Mumbai');
  const [checkIn, setCheckIn] = useState(hotelSearchParams.checkIn || dayjs().format('YYYY-MM-DD'));
  const [checkOut, setCheckOut] = useState(hotelSearchParams.checkOut || dayjs().add(1, 'day').format('YYYY-MM-DD'));
  const [rooms, setRooms] = useState(hotelSearchParams.rooms || 1);
  const [adults, setAdults] = useState(hotelSearchParams.adults || 2);
  const [children, setChildren] = useState(hotelSearchParams.children || 0);
  const [priceRange, setPriceRange] = useState<[number, number]>(hotelSearchParams.priceRange || [1000, 10000]);
  const [starRating, setStarRating] = useState(hotelSearchParams.starRating || 0);
  
  // Handle form submission
  const handleSearch = () => {
    setLoading(true);
    
    // Update Redux store with current search parameters
    dispatch(setHotelSearch({
      city,
      checkIn,
      checkOut,
      rooms,
      guests: adults + children, // Set guests as sum of adults and children
      adults,
      children,
      priceRange,
      starRating
    }));
    
    // Fetch hotel results
    fetchHotels();
  };
  
  // Fetch hotels from API
  const fetchHotels = async () => {
    try {
      const response = await fetch(`/api/hotels/search?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`);
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setHotels(data);
      } else {
        setHotels([]);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Load hotels on mount with default values
  useEffect(() => {
    handleSearch();
  }, []);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Search form */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Search Hotels and Homestays
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          {/* City Selection */}
          <Box sx={{ flex: '1 1 240px', minWidth: '240px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>City, Area or Property</InputLabel>
              <Select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="City, Area or Property"
                startAdornment={<LocationOnIcon sx={{ color: 'text.secondary', mr: 1 }} />}
              >
                {cityOptions.map((cityOption) => (
                  <MenuItem key={cityOption} value={cityOption}>{cityOption}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          {/* Check-in Date */}
          <Box sx={{ flex: '1 1 170px', minWidth: '170px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <TextField
                type="date"
                label="Check-in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </FormControl>
          </Box>
          
          {/* Check-out Date */}
          <Box sx={{ flex: '1 1 170px', minWidth: '170px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <TextField
                type="date"
                label="Check-out"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </FormControl>
          </Box>
          
          {/* Rooms and Guests */}
          <Box sx={{ flex: '1 1 240px', minWidth: '240px' }}>
            <Box sx={{ 
              display: 'flex',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              borderRadius: '4px',
              p: 1,
              alignItems: 'center'
            }}>
              <PersonIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Rooms: {rooms}, Adults: {adults}
                  {children > 0 && `, Children: ${children}`}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {/* Search Button */}
          <Box sx={{ flex: '0 0 120px' }}>
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'SEARCH'}
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
              Price per night
            </Typography>
            
            <Box sx={{ px: 2 }}>
              <Typography variant="body2" mb={1}>
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </Typography>
              
              {/* Price slider would go here */}
              <Box sx={{ 
                height: 4, 
                bgcolor: '#e0e0e0', 
                borderRadius: 2, 
                position: 'relative',
                my: 2
              }}>
                <Box sx={{ 
                  position: 'absolute', 
                  left: '20%', 
                  right: '40%', 
                  top: 0, 
                  height: '100%', 
                  bgcolor: '#008cff', 
                  borderRadius: 2 
                }} />
              </Box>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Star Category
            </Typography>
            
            {[5, 4, 3, 2, 1].map((stars) => (
              <Box 
                key={stars}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 0.5,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.04)' }
                }}
                onClick={() => setStarRating(stars === starRating ? 0 : stars)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating value={stars} readOnly size="small" />
                  <Typography variant="body2" ml={1}>
                    {stars} Star{stars !== 1 && 's'}
                  </Typography>
                </Box>
                {starRating === stars && (
                  <Chip 
                    label="Selected" 
                    size="small" 
                    variant="outlined" 
                    sx={{ 
                      borderColor: '#008cff', 
                      color: '#008cff',
                      fontSize: '0.7rem'
                    }} 
                  />
                )}
              </Box>
            ))}
          </Paper>
          
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Property Type
            </Typography>
            
            {['Hotel', 'Resort', 'Villa', 'Apartment', 'Homestay'].map((type) => (
              <Box 
                key={type}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  py: 0.5,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.04)' }
                }}
              >
                <Typography variant="body2">
                  {type}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
        
        {/* Results */}
        <Box sx={{ flex: 1 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : hotels.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>No hotels found</Typography>
              <Typography variant="body2" color="text.secondary">
                Try changing your search parameters or select different dates.
              </Typography>
            </Paper>
          ) : (
            <HotelResults 
              hotels={hotels} 
              loading={false} 
              city={city} 
              checkIn={checkIn} 
              checkOut={checkOut} 
            />
          )}
        </Box>
      </Box>
      
      {/* Popular city hotels */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Popular Hotels in {city}
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
          {['Luxury Suites', 'Grand Plaza', 'Ocean View', 'City Comfort'].map((hotel, index) => (
            <Paper 
              key={hotel}
              sx={{ 
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: 3 
                }
              }}
            >
              <Box 
                sx={{ 
                  height: 180, 
                  bgcolor: `rgba(0, 140, 255, ${0.5 + index * 0.1})`,
                  position: 'relative'
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.8rem'
                  }}
                >
                  {3 + index} Nights
                </Box>
              </Box>
              
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {hotel}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={4.5 - index * 0.5} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" ml={0.5} color="text.secondary">
                    {(4.5 - index * 0.5).toFixed(1)}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {city}, 1.{index + 1} km from center
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    From
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="#008cff">
                    ₹{(4000 + index * 1500).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default HotelSearchPage;