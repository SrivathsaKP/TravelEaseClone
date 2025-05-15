import { useState } from 'react';
import { useLocation } from 'wouter';
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
  IconButton,
  Chip,
  Stack,
  Slider,
  Rating
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TabNavigation from '@/components/TabNavigation';
import { formatCurrency } from '@/lib/utils';

// Mock cities data
const cities = [
  { id: 1, name: 'Mumbai', state: 'Maharashtra' },
  { id: 2, name: 'Delhi', state: 'Delhi' },
  { id: 3, name: 'Bangalore', state: 'Karnataka' },
  { id: 4, name: 'Hyderabad', state: 'Telangana' },
  { id: 5, name: 'Chennai', state: 'Tamil Nadu' },
  { id: 6, name: 'Kolkata', state: 'West Bengal' },
  { id: 7, name: 'Jaipur', state: 'Rajasthan' },
  { id: 8, name: 'Ahmedabad', state: 'Gujarat' },
  { id: 9, name: 'Pune', state: 'Maharashtra' },
  { id: 10, name: 'Goa', state: 'Goa' },
];

// Popular hotel collections
const popularHotels = [
  { name: 'Luxury Hotels', description: 'Experience ultimate comfort', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { name: 'Budget-Friendly', description: 'Great deals under ₹1999', imageUrl: 'https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
  { name: 'Beach Resorts', description: 'Relax by the shore', imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
  { name: 'Business Hotels', description: 'Perfect for work trips', imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
];

const HotelSearchPage = () => {
  const [, setLocation] = useLocation();
  const [city, setCity] = useState<{id: number; name: string; state: string} | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() + 2))
  );
  const [roomAndGuests, setRoomAndGuests] = useState({
    rooms: 1,
    adults: 2,
    children: 0
  });
  const [priceRange, setPriceRange] = useState<number[]>([500, 50000]);
  const [starRating, setStarRating] = useState<number | null>(null);

  // Update rooms and guests count
  const updateRoomAndGuests = (type: 'rooms' | 'adults' | 'children', increment: boolean) => {
    setRoomAndGuests(prev => {
      const newCount = prev[type] + (increment ? 1 : -1);
      
      // Apply constraints
      if (newCount < 1 && (type === 'rooms' || type === 'adults')) return prev;
      if (newCount < 0) return prev;
      if (prev.adults + prev.children + (increment && type === 'children' ? 1 : 0) > 20) return prev;
      
      return {
        ...prev,
        [type]: newCount
      };
    });
  };

  // Handle search
  const handleSearch = () => {
    if (!city || !checkInDate || !checkOutDate) {
      // Show validation error
      alert('Please select city, check-in and check-out dates');
      return;
    }

    // Calculate number of nights
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (nights < 1) {
      alert('Check-out date must be after check-in date');
      return;
    }

    // Build search params
    const params = new URLSearchParams();
    params.append('city', city.name);
    params.append('checkIn', checkInDate.toISOString().split('T')[0]);
    params.append('checkOut', checkOutDate.toISOString().split('T')[0]);
    params.append('rooms', roomAndGuests.rooms.toString());
    params.append('adults', roomAndGuests.adults.toString());
    params.append('children', roomAndGuests.children.toString());
    params.append('minPrice', priceRange[0].toString());
    params.append('maxPrice', priceRange[1].toString());
    
    if (starRating) {
      params.append('rating', starRating.toString());
    }
    
    // Navigate to results page
    setLocation('/hotels/search?' + params.toString());
  };

  return (
    <>
      <TabNavigation />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="#008cff">
            Hotel Search
          </Typography>
          
          {/* Hotel Search Form */}
          <Grid container spacing={3}>
            {/* City */}
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={city}
                onChange={(event, newValue) => {
                  setCity(newValue);
                }}
                options={cities}
                getOptionLabel={(option) => `${option.name}, ${option.state}`}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="CITY / LOCALITY / LANDMARK" 
                    placeholder="Where are you going?" 
                    required
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                            <LocationOnIcon color="action" />
                          </Box>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div>
                      <Typography variant="body1">{option.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{option.state}</Typography>
                    </div>
                  </li>
                )}
              />
            </Grid>
            
            {/* Check-in Date */}
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="CHECK-IN"
                  value={checkInDate}
                  onChange={(newValue) => setCheckInDate(newValue)}
                  disablePast
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
            
            {/* Check-out Date */}
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="CHECK-OUT"
                  value={checkOutDate}
                  onChange={(newValue) => setCheckOutDate(newValue)}
                  disablePast
                  minDate={
                    checkInDate 
                      ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000) 
                      : undefined
                  }
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
            
            {/* Rooms & Guests */}
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                  Rooms & Guests
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography>Rooms</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updateRoomAndGuests('rooms', false)}
                          disabled={roomAndGuests.rooms <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{roomAndGuests.rooms}</Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => updateRoomAndGuests('rooms', true)}
                          disabled={roomAndGuests.rooms >= 8}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography>Adults</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updateRoomAndGuests('adults', false)}
                          disabled={roomAndGuests.adults <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{roomAndGuests.adults}</Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => updateRoomAndGuests('adults', true)}
                          disabled={roomAndGuests.adults + roomAndGuests.children >= 20}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography>Children <Typography variant="caption" component="span">(0-17 years)</Typography></Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updateRoomAndGuests('children', false)}
                          disabled={roomAndGuests.children <= 0}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{roomAndGuests.children}</Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => updateRoomAndGuests('children', true)}
                          disabled={roomAndGuests.adults + roomAndGuests.children >= 20}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            {/* Price Range */}
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Price Range</Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => setPriceRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100000}
                  step={500}
                  valueLabelFormat={(value) => `₹${value}`}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">{formatCurrency(priceRange[0])}</Typography>
                  <Typography variant="body2">{formatCurrency(priceRange[1])}</Typography>
                </Box>
              </Box>
            </Grid>
            
            {/* Star Rating */}
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Star Rating</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Chip
                    key={rating}
                    icon={<Rating value={rating} readOnly size="small" />}
                    label={`${rating} Star${rating > 1 ? 's' : ''}`}
                    onClick={() => setStarRating(rating === starRating ? null : rating)}
                    variant={starRating === rating ? 'filled' : 'outlined'}
                    color={starRating === rating ? 'primary' : 'default'}
                    sx={{ minWidth: 100, justifyContent: 'space-between' }}
                  />
                ))}
              </Box>
            </Grid>
            
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
            Popular Hotel Collections
          </Typography>
          <Grid container spacing={3}>
            {popularHotels.map((hotel, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={1}
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    }
                  }}
                  onClick={() => navigate(`/hotels/search?collection=${encodeURIComponent(hotel.name)}`)}
                >
                  <Box
                    sx={{
                      height: 160,
                      backgroundImage: `url(${hotel.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                        p: 2
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {hotel.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        {hotel.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HotelSearchPage;