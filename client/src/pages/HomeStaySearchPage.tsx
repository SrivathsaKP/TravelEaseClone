import { useState } from 'react';
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
  Chip,
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
  KeyboardArrowRight,
  Check,
  Kitchen,
  Wifi,
  LocalParking,
  Bathtub,
  AcUnit,
  Yard
} from '@mui/icons-material';
import { styled, alpha } from '@mui/system';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import TabNavigation from '@/components/TabNavigation';
import { useQuery } from '@tanstack/react-query';
import { Homestay } from '@/lib/types';
import { useSearchParams } from '@/lib/utils';
import { useLocation } from 'wouter';

// Styled Components
const SearchContainer = styled(Container)(({ theme }) => ({
  marginTop: '-50px',
  marginBottom: '30px',
  position: 'relative',
  zIndex: 10,
}));

const HomeStayCard = styled(Paper)(({ theme }) => ({
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: '16px',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
}));

const TagChip = styled(Chip)(({ theme }) => ({
  margin: '0 4px 4px 0',
  fontSize: '12px',
  height: '24px',
}));

const PriceTag = styled(Box)(({ theme }) => ({
  backgroundColor: '#ebf7ff',
  padding: '4px 8px',
  borderRadius: '4px',
  display: 'inline-block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#0073b1',
}));

const ImageGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gridTemplateRows: '1fr 1fr',
  gap: '4px',
  height: '220px',
}));

const MainImage = styled(Box)(({ theme }) => ({
  gridRow: '1 / span 2',
  gridColumn: '1',
  height: '100%',
  position: 'relative',
}));

const SmallImage = styled(Box)(({ theme }) => ({
  height: '100%',
  position: 'relative',
}));

const ViewAllPhotos = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '12px',
  right: '12px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 600,
  cursor: 'pointer',
}));

// Cities with areas for homestay search
const locations = [
  { 
    city: 'Goa',
    areas: ['North Goa', 'South Goa', 'Calangute', 'Candolim', 'Baga', 'Anjuna', 'Vagator', 'Old Goa', 'Panjim']
  },
  { 
    city: 'Uttarakhand',
    areas: ['Nainital', 'Mussoorie', 'Dehradun', 'Rishikesh', 'Haridwar', 'Jim Corbett']
  },
  { 
    city: 'Himachal Pradesh',
    areas: ['Shimla', 'Manali', 'Dharamshala', 'Dalhousie', 'Kasol', 'Kullu']
  },
  { 
    city: 'Kerala',
    areas: ['Munnar', 'Kochi', 'Alleppey', 'Kumarakom', 'Wayanad', 'Thekkady']
  },
];

// Property types
const propertyTypes = [
  'Villa', 'Cottage', 'Apartment', 'Farm Stay', 'Tree House', 'Houseboat'
];

// Amenities for filtering
const amenities = [
  { icon: <Kitchen fontSize="small" />, name: 'Kitchen' },
  { icon: <Wifi fontSize="small" />, name: 'Free WiFi' },
  { icon: <LocalParking fontSize="small" />, name: 'Parking' },
  { icon: <Bathtub fontSize="small" />, name: 'Private Bathroom' },
  { icon: <AcUnit fontSize="small" />, name: 'Air Conditioning' },
  { icon: <Yard fontSize="small" />, name: 'Garden' },
];

const HomeStaySearchPage = () => {
  const [location, setLocation] = useLocation();
  const { getParam } = useSearchParams();
  
  // Get URL params or default values
  const city = getParam('location') || 'Goa';
  const checkIn = getParam('checkin') || format(new Date(), 'yyyy-MM-dd');
  const checkOut = getParam('checkout') || (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2); // Default 2 night stay for homestays
    return format(tomorrow, 'yyyy-MM-dd');
  })();
  const guests = getParam('guests') || '2 Adults';
  
  // Form state
  const [locationValue, setLocationValue] = useState(city);
  const [checkInDate, setCheckInDate] = useState(checkIn);
  const [checkOutDate, setCheckOutDate] = useState(checkOut);
  const [guestsCount, setGuestsCount] = useState(guests);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 15000]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
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
    
    // Navigate to homestay results
    setLocation(`/homestays/search?${searchParams.toString()}`);
  };

  // Toggle rating filter
  const handleRatingToggle = (rating: string) => {
    setSelectedRatings(prev => 
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

  // Fetch homestays from API if on search results page
  const { data, isLoading } = useQuery<{data: Homestay[]}>({
    queryKey: ['/api/homestays/search', locationValue, checkInDate, checkOutDate],
    enabled: location.includes('/homestays/search')
  });

  const allHomestays = data?.data || [];
  
  // Apply filters
  const filteredHomestays = allHomestays.filter(homestay => {
    // Price filter
    if (homestay.pricePerNight < priceRange[0] || homestay.pricePerNight > priceRange[1]) {
      return false;
    }
    
    // Rating filter
    if (selectedRatings.length > 0) {
      const rating = Math.floor(homestay.rating);
      if (!selectedRatings.includes(rating.toString())) {
        return false;
      }
    }
    
    // Amenities filter
    if (selectedAmenities.length > 0) {
      const homestayAmenities = homestay.amenities || [];
      if (!selectedAmenities.every(amenity => homestayAmenities.includes(amenity))) {
        return false;
      }
    }
    
    // Property type filter
    if (selectedPropertyTypes.length > 0 && !selectedPropertyTypes.includes(homestay.propertyType)) {
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
        <title>{location.includes('/homestays/search') 
          ? `Homestays in ${locationValue} | TravelEase` 
          : 'Homestay Booking | TravelEase'}</title>
        <meta name="description" content="Book beautiful homestays, villas, and apartments with unique local experiences. Perfect for families, couples, and groups." />
      </Helmet>

      {/* Hero header with beautiful imagery */}
      <Box sx={{ 
        bgcolor: location.includes('/homestays/search') ? '#095046' : '#2e7d32', 
        height: '250px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
      }}>
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" component="h1" sx={{ color: 'white', textAlign: 'center', mt: 3 }}>
            {location.includes('/homestays/search') 
              ? `Homestays in ${locationValue}` 
              : 'Discover Unique Homestays'}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'white', textAlign: 'center', mt: 1 }}>
            Live like a local and experience authentic stays
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
                    label="DESTINATION"
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

              <Grid item xs={6} md={2.5}>
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

              <Grid item xs={6} md={2.5}>
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
                  label="GUESTS"
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
                  <MenuItem value="1 Adult">1 Adult</MenuItem>
                  <MenuItem value="2 Adults">2 Adults</MenuItem>
                  <MenuItem value="3 Adults">3 Adults</MenuItem>
                  <MenuItem value="4 Adults">4 Adults</MenuItem>
                  <MenuItem value="2 Adults, 1 Child">2 Adults, 1 Child</MenuItem>
                  <MenuItem value="2 Adults, 2 Children">2 Adults, 2 Children</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6} md={2}>
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

      {/* Homestay Results Section */}
      {location.includes('/homestays/search') && (
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
                      Price per night
                    </Typography>
                    <Box sx={{ px: 1 }}>
                      <Slider
                        value={priceRange}
                        onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
                        min={500}
                        max={25000}
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

                  {/* Rating Filter */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Rating
                    </Typography>
                    <FormGroup>
                      {['5', '4', '3'].map((rating) => (
                        <FormControlLabel
                          key={rating}
                          control={
                            <Checkbox 
                              checked={selectedRatings.includes(rating)}
                              onChange={() => handleRatingToggle(rating)}
                              size="small"
                            />
                          }
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Rating value={parseInt(rating)} readOnly size="small" />
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {rating}+ Rated
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

            {/* Homestay Listings */}
            <Grid item xs={12} md={9}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {filteredHomestays.length} Homestays in {locationValue}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {format(new Date(checkInDate), 'EEE, d MMM')} - {format(new Date(checkOutDate), 'EEE, d MMM')} • {getNightCount()} {getNightCount() === 1 ? 'night' : 'nights'} • {guestsCount}
                </Typography>
              </Box>

              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <Typography>Loading homestays...</Typography>
                </Box>
              ) : filteredHomestays.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '8px' }}>
                  <Typography variant="h6" gutterBottom>No homestays found</Typography>
                  <Typography variant="body1">
                    Try adjusting your filters or search for a different location.
                  </Typography>
                </Paper>
              ) : (
                <>
                  {filteredHomestays.map((homestay, index) => (
                    <HomeStayCard key={index} elevation={1}>
                      <Grid container>
                        {/* Homestay Images */}
                        <Grid item xs={12} md={5}>
                          <ImageGrid>
                            <MainImage>
                              <img
                                src={homestay.images[0]?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
                                alt={homestay.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </MainImage>
                            <SmallImage>
                              <img
                                src={homestay.images[1]?.url || "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
                                alt={homestay.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </SmallImage>
                            <SmallImage>
                              <img
                                src={homestay.images[2]?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
                                alt={homestay.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </SmallImage>
                            <ViewAllPhotos>
                              View all photos
                            </ViewAllPhotos>
                          </ImageGrid>
                        </Grid>

                        {/* Homestay Details */}
                        <Grid item xs={12} md={7}>
                          <Box sx={{ p: 2 }}>
                            <Grid container>
                              <Grid item xs={12} md={8}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                                  <Typography variant="h6" component="h2" fontWeight={600}>
                                    {homestay.name}
                                  </Typography>
                                  <Box sx={{ 
                                    bgcolor: '#4caf50', 
                                    color: 'white', 
                                    borderRadius: '4px', 
                                    py: 0.5, 
                                    px: 1, 
                                    display: { xs: 'none', md: 'flex' },
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                    <Typography variant="body2" fontWeight={600}>
                                      {homestay.rating}
                                    </Typography>
                                  </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <LocationOn fontSize="small" color="action" />
                                  <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                    {homestay.location}
                                  </Typography>
                                </Box>

                                <Box sx={{ mb: 1 }}>
                                  <TagChip 
                                    label={homestay.propertyType || "Villa"} 
                                    color="primary" 
                                    variant="outlined" 
                                    size="small" 
                                  />
                                  <TagChip 
                                    label={`${homestay.bedrooms} Bedroom${homestay.bedrooms > 1 ? 's' : ''}`} 
                                    color="default" 
                                    variant="outlined" 
                                    size="small" 
                                  />
                                  <TagChip 
                                    label={`${homestay.maxGuests} Guests`} 
                                    color="default" 
                                    variant="outlined" 
                                    size="small" 
                                  />
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  {homestay.description?.substring(0, 120)}
                                  {homestay.description && homestay.description.length > 120 ? '...' : ''}
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                  {homestay.amenities?.slice(0, 3).map((amenity, i) => (
                                    <Box key={i} sx={{ display: 'inline-flex', alignItems: 'center', mr: 2 }}>
                                      <Check fontSize="small" color="primary" />
                                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                                        {amenity}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>

                                {homestay.specialOffer && (
                                  <PriceTag sx={{ mb: 1 }}>
                                    {homestay.specialOffer}
                                  </PriceTag>
                                )}
                              </Grid>

                              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
                                <Box sx={{ 
                                  bgcolor: '#4caf50', 
                                  color: 'white', 
                                  borderRadius: '4px', 
                                  py: 0.5, 
                                  px: 1, 
                                  mb: 1,
                                  display: { xs: 'flex', md: 'none' },
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <Typography variant="body2" fontWeight={600}>
                                    {homestay.rating}
                                  </Typography>
                                </Box>

                                <Box sx={{ textAlign: { xs: 'left', md: 'right' }, mt: 'auto' }}>
                                  <Typography variant="body2" color="text.secondary">
                                    {getNightCount()} nights
                                  </Typography>
                                  <Typography variant="h5" component="div" color="primary" fontWeight={700}>
                                    ₹{homestay.pricePerNight}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    + ₹{Math.round(homestay.pricePerNight * 0.12)} taxes & fees
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    per night
                                  </Typography>
                                  <Button 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth
                                    endIcon={<KeyboardArrowRight />}
                                    sx={{ mt: 1 }}
                                  >
                                    View Details
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </HomeStayCard>
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

export default HomeStaySearchPage;