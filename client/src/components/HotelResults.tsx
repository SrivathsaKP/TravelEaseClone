import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Hotel } from "@/lib/types";
import { ChevronDown, ChevronUp, Star, MapPin, Wifi, Coffee, Car, Snowflake, Plus, Heart, Filter } from "lucide-react";
import { 
  Box, 
  Paper, 
  Typography, 
  Tab, 
  Tabs, 
  Chip, 
  Card, 
  CardMedia,
  Divider,
  Grid,
  Container,
  CircularProgress,
  IconButton,
  Rating,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { SearchResultsSkeleton } from "@/components/ui/skeleton";
import KingBedIcon from '@mui/icons-material/KingBed';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface HotelResultsProps {
  hotels: Hotel[];
  loading: boolean;
  city: string;
  checkIn: string;
  checkOut: string;
}

const HotelResults = ({ hotels, loading, city, checkIn, checkOut }: HotelResultsProps) => {
  const [, setLocation] = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 15000]);
  const [starRating, setStarRating] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [expandedHotels, setExpandedHotels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("price-low-high");
  const [activeTab, setActiveTab] = useState(0);
  const [showFilters, setShowFilters] = useState(!isMobile);

  // Hotel image mapping - using exact same URLs as landing page with tab-based randomization
  const getHotelImage = (hotelName: string, hotelId: any) => {
    // Use the exact same URLs as the landing page PopularHotels component
    const hotelImages = [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    ];
    
    // Handle hotel ID properly - convert to number and provide fallback
    const id = typeof hotelId === 'number' ? hotelId : 
               typeof hotelId === 'string' ? parseInt(hotelId) || 0 : 0;
    
    // Add tab-based randomization - activeTab changes the starting point
    const randomOffset = activeTab * 2; // Different offset for each tab
    const imageIndex = (Math.abs(id) + randomOffset) % 3;
    
    // Use hotel ID with randomization to cycle through the 3 images
    return hotelImages[imageIndex];
  };
  
  // Filter options
  const starRatingOptions = [5, 4, 3, 2, 1];
  const amenities = ["WiFi", "Breakfast", "Parking", "AC", "Pool", "Gym", "Restaurant", "Bar", "Spa", "Room service"];

  // Filter hotels
  const filteredHotels = hotels.filter(hotel => {
    // Get minimum price
    const minPrice = hotel.roomTypes && Array.isArray(hotel.roomTypes) 
      ? Math.min(...hotel.roomTypes.map(room => room.pricing.totalPrice))
      : 0;
    
    // Filter by price
    if (minPrice < priceRange[0] || minPrice > priceRange[1]) {
      return false;
    }
    
    // Filter by star rating
    if (starRating.length > 0 && !starRating.includes(hotel.starRating)) {
      return false;
    }
    
    // Filter by amenities
    if (selectedAmenities.length > 0) {
      if (!hotel.amenities || !Array.isArray(hotel.amenities)) {
        return false;
      }
      
      for (const amenity of selectedAmenities) {
        if (!hotel.amenities.includes(amenity)) {
          return false;
        }
      }
    }
    
    return true;
  });
  
  // Sort hotels
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        const minPriceA = a.roomTypes && Array.isArray(a.roomTypes) 
          ? Math.min(...a.roomTypes.map(room => room.pricing.totalPrice))
          : 0;
        const minPriceB = b.roomTypes && Array.isArray(b.roomTypes) 
          ? Math.min(...b.roomTypes.map(room => room.pricing.totalPrice))
          : 0;
        return minPriceA - minPriceB;
      case "price-high-low":
        const maxPriceA = a.roomTypes && Array.isArray(a.roomTypes) 
          ? Math.min(...a.roomTypes.map(room => room.pricing.totalPrice))
          : 0;
        const maxPriceB = b.roomTypes && Array.isArray(b.roomTypes) 
          ? Math.min(...b.roomTypes.map(room => room.pricing.totalPrice))
          : 0;
        return maxPriceB - maxPriceA;
      case "rating-high-low":
        return b.starRating - a.starRating;
      case "name-a-z":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  // Get nights count between two dates
  const getNightCount = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  interface SortOption {
    label: string;
    value: string;
    icon: React.ReactNode;
  }

  const sortOptions: SortOption[] = [
    { label: "PRICE", value: "price-low-high", icon: <LocalOfferIcon fontSize="small" /> },
    { label: "STAR CATEGORY", value: "rating-high-low", icon: <Star size={16} /> },
    { label: "USER RATING", value: "user-rating", icon: <ThumbUpIcon fontSize="small" /> },
    { label: "RECOMMENDED", value: "recommended", icon: <FreeBreakfastIcon fontSize="small" /> }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Set the sort criteria based on the selected tab
    switch(newValue) {
      case 0:
        setSortBy("price-low-high");
        break;
      case 1: 
        setSortBy("rating-high-low");
        break;
      case 2:
        setSortBy("name-a-z");
        break;
      case 3:
        // Keep current sort
        break;
      default:
        setSortBy("price-low-high");
    }
  };
  
  // Toggle expanded hotel details
  const toggleHotelDetails = (hotelId: string) => {
    setExpandedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };
  
  // Handle star rating change
  const handleStarRatingChange = (rating: number) => {
    setStarRating(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };
  
  // Handle amenity change
  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 8, mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Filters Sidebar */}
        <Box sx={{ 
          width: { xs: '100%', sm: '240px', md: '270px' }, 
          bgcolor: 'white', 
          borderRadius: 2,
          boxShadow: 1,
          p: { xs: 1.5, md: 2 },
          alignSelf: 'flex-start',
          position: { xs: 'static', md: 'sticky' },
          top: { xs: 'auto', md: '90px' }
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2 
          }}>
            <Typography variant="h6" fontWeight="bold">Filters</Typography>
            {isMobile && (
              <IconButton
                size="small"
                onClick={() => setShowFilters(!showFilters)}
                sx={{ 
                  color: '#008cff',
                  '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.1)' }
                }}
              >
                {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </IconButton>
            )}
          </Box>
          
          <Box sx={{ 
            display: { xs: showFilters ? 'block' : 'none', md: 'block' }
          }}>
            <Box sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              pb: 2, 
              mb: 2,
              display: { xs: 'none', md: 'block' }
            }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Price Per Night</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary">₹{priceRange[0]}</Typography>
                <Typography variant="caption" color="text.secondary">₹{priceRange[1]}</Typography>
              </Box>
              <Slider
                defaultValue={[1000, 15000]}
                min={1000}
                max={15000}
                step={500}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="w-full"
              />
            </Box>
            
            <Box sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              pb: 2, 
              mb: 2,
              display: { xs: 'none', md: 'block' }
            }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Star Category</Typography>
              {starRatingOptions.map(rating => (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} key={rating}>
                  <Checkbox 
                    id={`rating-${rating}`} 
                    checked={starRating.includes(rating)}
                    onCheckedChange={() => handleStarRatingChange(rating)}
                  />
                  <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                    <Rating
                      value={rating}
                      readOnly
                      size="small"
                      sx={{ color: '#FFD700' }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
            
            <Box sx={{ pb: 2, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Hotel Amenities</Typography>
              <Box sx={{ ml: 1 }}>
                {amenities.slice(0, 8).map((amenity, index) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }} key={index}>
                    <Checkbox 
                      id={`amenity-${index}`} 
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityChange(amenity)}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {amenity === 'WiFi' && <WifiIcon sx={{ fontSize: 16, mr: 0.5 }} />}
                      {amenity === 'Breakfast' && <FreeBreakfastIcon sx={{ fontSize: 16, mr: 0.5 }} />}
                      {amenity === 'Parking' && <Car size={16} className="mr-1" />}
                      {amenity === 'AC' && <Snowflake size={16} className="mr-1" />}
                      {amenity === 'Pool' && <PoolIcon sx={{ fontSize: 16, mr: 0.5 }} />}
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {amenity}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            
            <Button 
              className="w-full bg-primary text-white py-2 rounded-lg font-medium text-sm"
              sx={{ 
                bgcolor: '#008cff', 
                '&:hover': { bgcolor: '#0071ce' },
                fontWeight: 'bold',
                color: 'white',
                width: '100%'
              }}
            >
              APPLY FILTERS
            </Button>
          </Box>
        </Box>
        
        {/* Results List */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Hotels in {city}</Typography>
            <Typography variant="body2" color="text.secondary">
              {checkIn} - {checkOut} • {getNightCount(checkIn, checkOut)} nights
            </Typography>
          </Box>
          
          {/* Sorting tabs */}
          <Box sx={{ mb: 2 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                boxShadow: 1,
                '.MuiTabs-indicator': { 
                  height: '3px',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  bgcolor: '#008cff',
                  boxShadow: '0 2px 4px rgba(0, 140, 255, 0.3)'
                }
              }}
            >
              {sortOptions.map((option, index) => (
                <Tab 
                  key={option.value}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: '35px', 
                        height: '35px', 
                        borderRadius: '50%', 
                        bgcolor: index === activeTab ? 'rgba(0, 140, 255, 0.15)' : 'rgba(0, 140, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 0.5,
                        border: index === activeTab ? '2px solid #008cff' : '2px solid transparent'
                      }}>
                        {React.cloneElement(option.icon, { 
                          sx: { 
                            color: index === activeTab ? '#008cff' : '#666',
                            fontSize: '1.2rem'
                          } 
                        })}
                      </Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: index === activeTab ? 'bold' : 'normal',
                          color: index === activeTab ? '#008cff' : '#666',
                          fontSize: '0.75rem'
                        }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                  }
                  sx={{ 
                    textTransform: 'none',
                    minWidth: 0,
                    p: 1,
                    '&.Mui-selected': {
                      color: '#008cff'
                    }
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Information banner */}
          <Box sx={{ 
            bgcolor: 'white', 
            p: 1.5, 
            mb: 2, 
            borderRadius: 1,
            boxShadow: 1,
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography variant="body2">Hotels sorted by lowest price in {city}</Typography>
            <Typography variant="body2" sx={{ color: 'orange', fontStyle: 'italic' }}>
              Secret deals available for premium members
            </Typography>
          </Box>
          
          {loading ? (
            <SearchResultsSkeleton type="hotel" count={6} />
          ) : sortedHotels.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>No hotels found</Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters or search for a different city.
              </Typography>
            </Paper>
          ) : (
            <>
              {sortedHotels.map((hotel) => {
                // Calculate minimum price
                const minPrice = hotel.roomTypes && Array.isArray(hotel.roomTypes) 
                  ? Math.min(...hotel.roomTypes.map(room => room.pricing.totalPrice))
                  : 0;
                
                // Calculate average rating (use starRating if no reviews)
                const avgRating = hotel.starRating;
                
                return (
                  <Paper 
                    key={hotel.id} 
                    sx={{ 
                      p: 0, 
                      mb: 2, 
                      borderRadius: 1,
                      overflow: 'hidden'
                    }}
                    elevation={1}
                  >
                    {/* Top offer banner */}
                    {Math.random() > 0.6 && (
                      <Box sx={{ 
                        bgcolor: '#FFF6E3', 
                        p: 1, 
                        borderBottom: '1px solid #FFE1A5',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <LocalOfferIcon sx={{ color: '#FF8900', fontSize: 18, mr: 1 }} />
                        <Typography variant="caption" sx={{ color: '#FF8900' }}>
                          {Math.random() > 0.5 ? 
                            'Free Breakfast | Save 10% with HDFC Bank Credit Card' : 
                            'No Cancellation Fees | Free Room Upgrade'
                          }
                        </Typography>
                      </Box>
                    )}
                    
                    {/* Hotel Image - Full Width like landing page */}
                      <Box sx={{ 
                      width: '100%', 
                      height: '280px',
                        position: 'relative'
                      }}>
                                              <img 
                          src={getHotelImage(hotel.name, sortedHotels.indexOf(hotel))}
                          alt={hotel.name}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                        <Box sx={{ 
                          position: 'absolute', 
                        top: '12px', 
                        right: '12px',
                          bgcolor: 'white',
                        borderRadius: '6px',
                        p: 1,
                          display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 0.5 }}>
                            {avgRating.toFixed(1)}
                          </Typography>
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        </Box>
                        <IconButton
                          size="small"
                          sx={{ 
                            position: 'absolute', 
                          top: '12px', 
                          left: '12px',
                          bgcolor: 'rgba(255,255,255,0.9)',
                          '&:hover': { bgcolor: 'white' },
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        <Heart size={18} />
                        </IconButton>
                      </Box>
                      
                    {/* Hotel Details - Below image like landing page */}
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                              {hotel.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Box sx={{ display: 'flex', mr: 1 }}>
                                <Rating
                                  value={hotel.starRating}
                                  readOnly
                                  size="small"
                                  sx={{ color: '#FFD700' }}
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                {hotel.address}, {hotel.city}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                              {hotel.amenities && Array.isArray(hotel.amenities) && hotel.amenities.slice(0, 4).map((amenity, i) => (
                                <Chip
                                  key={i}
                                  size="small"
                                  label={amenity}
                                  sx={{ 
                                    height: '24px',
                                    bgcolor: 'rgba(0, 140, 255, 0.1)',
                                    color: '#008cff',
                                    '& .MuiChip-label': { px: 1 }
                                  }}
                                />
                              ))}
                            </Box>
                            
                            {hotel.roomTypes && Array.isArray(hotel.roomTypes) && hotel.roomTypes.length > 0 && (
                              <Typography variant="body2" color="text.secondary">
                                Room: {hotel.roomTypes[0].name}
                              </Typography>
                            )}
                          </Box>
                          
                          <Box sx={{ textAlign: 'right' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                              <Typography variant="body2" color="success.main" fontWeight="bold">
                                {Math.random() > 0.5 ? '20% OFF' : '15% OFF'}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through', mr: 0.5 }}>
                                  ₹{Math.round(minPrice * 1.2)}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#008cff' }}>
                                  ₹{minPrice}
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                per night
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                +₹{Math.round(minPrice * 0.18)} taxes & fees
                              </Typography>
                              <Button 
                                className="mt-1 bg-primary text-white"
                                sx={{ 
                                  bgcolor: '#008cff', 
                                  color: 'white',
                                  '&:hover': { bgcolor: '#0071ce' },
                                  mt: 1,
                                  minWidth: '120px',
                                  fontWeight: 'bold'
                                }}
                                onClick={() => {
                                  // Calculate total nights
                                  const nights = getNightCount(checkIn, checkOut);
                                  
                                  // Create a booking data object to pass to checkout
                                  const bookingData = {
                                    type: 'hotel',
                                    amount: minPrice * nights,
                                    details: {
                                      hotelName: hotel.name,
                                      location: hotel.city,
                                      checkIn: formatDate(checkIn),
                                      checkOut: formatDate(checkOut),
                                      nights: nights,
                                      guests: 2,
                                      roomType: hotel.roomTypes && Array.isArray(hotel.roomTypes) && hotel.roomTypes.length > 0 
                                        ? hotel.roomTypes[0].name 
                                        : 'Standard Room',
                                      pricePerNight: minPrice
                                    }
                                  };
                                  
                                  // Store booking data in sessionStorage
                                  sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
                                  
                                  // Navigate to checkout page
                                  setLocation('/checkout');
                                }}
                              >
                                VIEW ROOMS
                              </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    
                    {/* Additional options */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      bgcolor: '#f8f8f8', 
                      borderTop: '1px solid #eeeeee',
                      p: 1
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small" 
                          sx={{ mr: 1, color: '#008cff' }}
                          onClick={() => {}}
                        >
                          <Plus size={16} />
                        </IconButton>
                        <Typography variant="caption" sx={{ color: '#008cff' }}>
                          Add to compare
                        </Typography>
                      </Box>
                      
                      <Typography 
                        variant="caption" 
                        sx={{ color: '#008cff', cursor: 'pointer' }}
                        onClick={() => toggleHotelDetails(hotel.id.toString())}
                      >
                        View Hotel Details
                        {expandedHotels.includes(hotel.id.toString()) ? 
                          <ChevronUp className="ml-1 h-4 w-4 inline" /> : 
                          <ChevronDown className="ml-1 h-4 w-4 inline" />}
                      </Typography>
                    </Box>
                    
                    {/* Expanded details */}
                    {expandedHotels.includes(hotel.id.toString()) && (
                      <Box sx={{ p: 2, borderTop: '1px solid #eeeeee' }}>
                        {hotel.roomTypes && Array.isArray(hotel.roomTypes) && hotel.roomTypes.map((room, i) => (
                          <Paper variant="outlined" sx={{ p: 2, mb: 2 }} key={i}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {room.name}
                              </Typography>
                              <Typography variant="subtitle1" fontWeight="bold" color="#008cff">
                                ₹{room.pricing.totalPrice}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {room.description || "Comfortable room with modern amenities"}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" color="text.secondary">
                                Sleeps {room.maxOccupancy || 2} | {room.size || 250} sqft
                              </Typography>
                              <Button 
                                variant="outlined" 
                                size="small"
                                sx={{ 
                                  borderColor: '#008cff', 
                                  color: '#008cff',
                                  '&:hover': { borderColor: '#0071ce', bgcolor: 'rgba(0,140,255,0.1)' }
                                }}
                              >
                                SELECT
                              </Button>
                            </Box>
                          </Paper>
                        ))}

                        <Box sx={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: 2, 
                          p: 2, 
                          bgcolor: '#f5f5f5',
                          borderRadius: 1  
                        }}>
                          <Box sx={{ flex: '1 0 200px' }}>
                            <Typography variant="subtitle2" gutterBottom>Hotel Information</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {hotel.description || `${hotel.name} offers comfortable accommodation in ${hotel.city} with excellent amenities and convenient location.`}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ flex: '1 0 200px' }}>
                            <Typography variant="subtitle2" gutterBottom>Hotel Policies</Typography>
                            <Box sx={{ display: 'flex', mb: 1 }}>
                              <Box sx={{ mr: 3 }}>
                                <Typography variant="body2" color="text.secondary">Check-in:</Typography>
                                <Typography variant="body2" fontWeight="medium">2:00 PM</Typography>
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary">Check-out:</Typography>
                                <Typography variant="body2" fontWeight="medium">12:00 PM</Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Paper>
                );
              })}
              
              {/* Pagination or "Load More" button */}
              {sortedHotels.length > 10 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      color: '#008cff', 
                      borderColor: '#008cff',
                      '&:hover': {
                        borderColor: '#0071ce',
                        bgcolor: 'rgba(0, 140, 255, 0.05)'
                      }
                    }}
                  >
                    Load More Hotels
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HotelResults;