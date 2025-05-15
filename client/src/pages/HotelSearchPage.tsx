import { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Box, 
  Typography, 
  Grid, 
  Button, 
  IconButton, 
  TextField, 
  MenuItem, 
  FormControl, 
  Slider,
  Checkbox,
  InputAdornment,
  Divider,
  Tabs,
  Tab,
  Rating,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import { 
  LocationOn, 
  DateRange, 
  Person, 
  Search, 
  FilterList,
  Star,
  Pool,
  Wifi,
  Spa,
  FreeBreakfast,
  Bathtub,
  AcUnit
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import TabNavigation from '@/components/TabNavigation';
import { useQuery } from '@tanstack/react-query';
import { Hotel } from '@/lib/types';
import { useSearchParams } from '@/lib/utils';
import { useLocation } from 'wouter';

// Styled Components
const SearchContainer = styled(Container)(({ theme }) => ({
  marginTop: '-50px',
  marginBottom: '30px',
  position: 'relative',
  zIndex: 10,
}));

const HotelCard = styled(Paper)(({ theme }) => ({
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: '16px',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
}));

const ImageCarousel = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '220px',
  overflow: 'hidden',
}));

const CarouselNav = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '15px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
}));

const CarouselDot = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  margin: '0 3px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  '&.active': {
    backgroundColor: 'white',
  },
}));

const PropertyTag = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  padding: '3px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 600,
  backgroundColor: '#f2f2f2',
  color: '#666',
  marginRight: '8px',
  marginBottom: '8px',
}));

const PriceTag = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffebee',
  padding: '4px 8px',
  borderRadius: '4px',
  display: 'inline-block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#e53935',
}));

// Cities with areas for hotel search
const locations = [
  { 
    city: 'Goa',
    areas: ['Calangute', 'Candolim', 'Baga', 'Anjuna', 'Panjim', 'Vagator', 'Old Goa']
  },
  { 
    city: 'Mumbai',
    areas: ['Colaba', 'Bandra', 'Juhu', 'Andheri', 'Powai', 'Worli']
  },
  { 
    city: 'Delhi',
    areas: ['Connaught Place', 'Karol Bagh', 'South Delhi', 'Aerocity', 'Paharganj']
  },
  { 
    city: 'Bangalore',
    areas: ['MG Road', 'Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City']
  },
];

// Amenities for filtering
const amenities = [
  { icon: <Pool fontSize="small" />, name: 'Swimming Pool' },
  { icon: <Wifi fontSize="small" />, name: 'Free WiFi' },
  { icon: <Spa fontSize="small" />, name: 'Spa' },
  { icon: <FreeBreakfast fontSize="small" />, name: 'Breakfast Included' },
  { icon: <Bathtub fontSize="small" />, name: 'Bathtub' },
  { icon: <AcUnit fontSize="small" />, name: 'Air Conditioning' },
];

// Property types
const propertyTypes = [
  'Hotel', 'Resort', 'Villa', 'Apartment', 'Homestay'
];

const HotelSearchPage = () => {
  const [location, setLocation] = useLocation();
  const { getParam } = useSearchParams();
  
  // Get URL params or default values
  const city = getParam('location') || 'Goa';
  const checkIn = getParam('checkin') || format(new Date(), 'yyyy-MM-dd');
  const checkOut = getParam('checkout') || (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return format(tomorrow, 'yyyy-MM-dd');
  })();
  const guests = getParam('guests') || '2 Adults';
  const rooms = getParam('rooms') || '1 Room';
  
  // Form state
  const [locationValue, setLocationValue] = useState(city);
  const [checkInDate, setCheckInDate] = useState(checkIn);
  const [checkOutDate, setCheckOutDate] = useState(checkOut);
  const [guestsCount, setGuestsCount] = useState(guests);
  const [roomsCount, setRoomsCount] = useState(rooms);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 10000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Handle search submission
  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('location', locationValue);
    searchParams.set('checkin', checkInDate);
    searchParams.set('checkout', checkOutDate);
    searchParams.set('guests', guestsCount);
    searchParams.set('rooms', roomsCount);
    
    // Navigate to hotel results
    setLocation(`/hotels/search?${searchParams.toString()}`);
  };

  // Toggle star rating filter
  const handleStarRatingToggle = (rating: number) => {
    setSelectedStars(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };

  // Toggle amenity filter
  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  // Toggle property type filter
  const handlePropertyTypeToggle = (type: string) => {
    setSelectedPropertyTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  // Fetch hotels from API if on search results page
  const { data, isLoading } = useQuery<{data: Hotel[]}>({
    queryKey: ['/api/hotels/search', locationValue, checkInDate, checkOutDate],
    enabled: location.includes('/hotels/search')
  });

  const allHotels = data?.data || [];
  
  // Apply filters
  const filteredHotels = allHotels.filter(hotel => {
    // Price filter
    const minPrice = Math.min(...hotel.roomTypes.map(room => room.pricing.totalPrice));
    if (minPrice < priceRange[0] || minPrice > priceRange[1]) {
      return false;
    }
    
    // Star rating filter
    if (selectedStars.length > 0 && !selectedStars.includes(hotel.starRating)) {
      return false;
    }
    
    // Amenities filter
    if (selectedAmenities.length > 0) {
      const hotelAmenities = hotel.amenities || [];
      if (!selectedAmenities.every(amenity => hotelAmenities.includes(amenity))) {
        return false;
      }
    }
    
    // Property type filter (assuming property type is stored in the hotel object)
    if (selectedPropertyTypes.length > 0 && hotel.propertyType && !selectedPropertyTypes.includes(hotel.propertyType)) {
      return false;
    }
    
    return true;
  });

  // Get nights count
  const getNightCount = () => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <Helmet>
        <title>{location.includes('/hotels/search') 
          ? `Hotels in ${locationValue} | TravelEase` 
          : 'Hotel Booking | TravelEase'}</title>
        <meta name="description" content="Book hotels online with best price guarantee. Choose from thousands of hotels for your stay." />
      </Helmet>

      {/* Hero header */}
      <Box sx={{ 
        bgcolor: location.includes('/hotels/search') ? '#051423' : '#035b72', 
        height: '220px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Container>
          <Typography variant="h4" component="h1" sx={{ color: 'white', textAlign: 'center', mt: 3 }}>
            {location.includes('/hotels/search') 
              ? `Hotels in ${locationValue}` 
              : 'Hotel Booking'}
          </Typography>
        </Container>
      </Box>

      {/* Tab Navigation */}
      <Container sx={{ mt: -2, mb: 2 }}>
        <TabNavigation />
      </Container>

      {/* Search Form */}
      <SearchContainer maxWidth="lg">
        <Paper elevation={3} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
          <Box sx={{ p: 3, bgcolor: '#f8f8f8' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    select
                    label="CITY, AREA OR PROPERTY"
                    value={locationValue}
                    onChange={(e) => setLocationValue(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {locations.map((loc) => [
                      <MenuItem key={loc.city} value={loc.city} sx={{ fontWeight: 'bold' }}>
                        {loc.city}
                      </MenuItem>,
                      ...loc.areas.map(area => (
                        <MenuItem key={`${loc.city}-${area}`} value={area} sx={{ pl: 4 }}>
                          {area}
                        </MenuItem>
                      ))
                    ])}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth
                  label="CHECK-IN"
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRange color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth
                  label="CHECK-OUT"
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRange color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  select
                  fullWidth
                  label="ROOMS & GUESTS"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="1 Adult">1 Room, 1 Adult</MenuItem>
                  <MenuItem value="2 Adults">1 Room, 2 Adults</MenuItem>
                  <MenuItem value="3 Adults">1 Room, 3 Adults</MenuItem>
                  <MenuItem value="4 Adults">1 Room, 4 Adults</MenuItem>
                  <MenuItem value="2 Rooms">2 Rooms, 4 Adults</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6} md={3}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ 
                    height: '56px', 
                    bgcolor: '#ff9800', 
                    '&:hover': { bgcolor: '#f57c00' }
                  }}
                  onClick={handleSearch}
                  startIcon={<Search />}
                >
                  SEARCH
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </SearchContainer>

      {/* Hotel Results Section */}
      {location.includes('/hotels/search') && (
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Filters Sidebar */}
            <Grid item xs={12} md={3}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: '8px', position: 'sticky', top: '20px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Filters
                  </Typography>
                  <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <IconButton 
                      size="small" 
                      onClick={() => setShowFilters(!showFilters)}
                      sx={{ border: '1px solid #ddd' }}
                    >
                      <FilterList />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ 
                  display: { xs: showFilters ? 'block' : 'none', md: 'block' }
                }}>
                  {/* Price Range Filter */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Price Range
                    </Typography>
                    <Box sx={{ px: 1 }}>
                      <Slider
                        value={priceRange}
                        onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
                        min={500}
                        max={20000}
                        step={500}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `₹${value}`}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          ₹{priceRange[0]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹{priceRange[1]}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Star Rating Filter */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Star Rating
                    </Typography>
                    <FormGroup>
                      {[5, 4, 3, 2, 1].map((star) => (
                        <FormControlLabel
                          key={star}
                          control={
                            <Checkbox 
                              checked={selectedStars.includes(star)}
                              onChange={() => handleStarRatingToggle(star)}
                              size="small"
                            />
                          }
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Rating value={star} readOnly size="small" />
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {star} Star{star !== 1 ? 's' : ''}
                              </Typography>
                            </Box>
                          }
                        />
                      ))}
                    </FormGroup>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Amenities Filter */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Amenities
                    </Typography>
                    <FormGroup>
                      {amenities.map((amenity) => (
                        <FormControlLabel
                          key={amenity.name}
                          control={
                            <Checkbox 
                              checked={selectedAmenities.includes(amenity.name)}
                              onChange={() => handleAmenityToggle(amenity.name)}
                              size="small"
                            />
                          }
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {amenity.icon}
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {amenity.name}
                              </Typography>
                            </Box>
                          }
                        />
                      ))}
                    </FormGroup>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Property Type Filter */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Property Type
                    </Typography>
                    <FormGroup>
                      {propertyTypes.map((type) => (
                        <FormControlLabel
                          key={type}
                          control={
                            <Checkbox 
                              checked={selectedPropertyTypes.includes(type)}
                              onChange={() => handlePropertyTypeToggle(type)}
                              size="small"
                            />
                          }
                          label={
                            <Typography variant="body2">
                              {type}
                            </Typography>
                          }
                        />
                      ))}
                    </FormGroup>
                  </Box>

                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Apply Filters
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Hotel Listings */}
            <Grid item xs={12} md={9}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {filteredHotels.length} Hotels in {locationValue}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {format(new Date(checkInDate), 'EEE, d MMM')} - {format(new Date(checkOutDate), 'EEE, d MMM')} • {getNightCount()} {getNightCount() === 1 ? 'night' : 'nights'} • {guestsCount}
                </Typography>
              </Box>

              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <Typography>Loading hotels...</Typography>
                </Box>
              ) : filteredHotels.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '8px' }}>
                  <Typography variant="h6" gutterBottom>No hotels found</Typography>
                  <Typography variant="body1">
                    Try adjusting your filters or search for a different location.
                  </Typography>
                </Paper>
              ) : (
                <>
                  {filteredHotels.map((hotel, index) => (
                    <HotelCard key={index} elevation={1}>
                      <Grid container>
                        {/* Hotel Image */}
                        <Grid item xs={12} md={4}>
                          <ImageCarousel>
                            <img
                              src={hotel.images[0]?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
                              alt={hotel.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <CarouselNav>
                              {[...Array(Math.min(5, hotel.images.length || 1))].map((_, i) => (
                                <CarouselDot key={i} className={i === 0 ? 'active' : ''} />
                              ))}
                            </CarouselNav>
                          </ImageCarousel>
                        </Grid>

                        {/* Hotel Details */}
                        <Grid item xs={12} md={8}>
                          <Box sx={{ p: 2 }}>
                            <Grid container>
                              <Grid item xs={12} md={8}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <Typography variant="h6" component="h2" fontWeight={600}>
                                    {hotel.name}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                    <Rating value={hotel.starRating} readOnly size="small" />
                                  </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <LocationOn fontSize="small" color="action" />
                                  <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                    {hotel.address}, {hotel.city}
                                  </Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                  {hotel.amenities?.slice(0, 3).map((amenity, i) => (
                                    <PropertyTag key={i}>{amenity}</PropertyTag>
                                  ))}
                                  {hotel.amenities && hotel.amenities.length > 3 && (
                                    <PropertyTag>+{hotel.amenities.length - 3} more</PropertyTag>
                                  )}
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  {hotel.description?.substring(0, 120)}
                                  {hotel.description && hotel.description.length > 120 ? '...' : ''}
                                </Typography>

                                {hotel.specialOffer && (
                                  <PriceTag sx={{ mb: 1 }}>
                                    {hotel.specialOffer}
                                  </PriceTag>
                                )}
                              </Grid>

                              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                  <Box sx={{ 
                                    bgcolor: '#4caf50', 
                                    color: 'white', 
                                    borderRadius: '4px', 
                                    py: 0.5, 
                                    px: 1, 
                                    mr: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                    <Typography variant="body2" fontWeight={600}>
                                      {hotel.userRating || '4.2'}
                                    </Typography>
                                  </Box>
                                  <Typography variant="body2" color="text.secondary">
                                    ({hotel.reviewCount || '128'} Reviews)
                                  </Typography>
                                </Box>

                                <Box sx={{ textAlign: 'right', mt: 'auto' }}>
                                  <Typography variant="body2" color="text.secondary">
                                    Starts from
                                  </Typography>
                                  <Typography variant="h5" component="div" color="primary" fontWeight={700}>
                                    ₹{Math.min(...hotel.roomTypes.map(room => room.pricing.totalPrice))}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    + ₹{Math.min(...hotel.roomTypes.map(room => room.pricing.taxesAndFees))} taxes
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    per night
                                  </Typography>
                                  <Button 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth
                                    sx={{ mt: 1 }}
                                  >
                                    View Rooms
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </HotelCard>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default HotelSearchPage;