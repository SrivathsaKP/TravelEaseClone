import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Hotel } from "@/lib/types";
import { ChevronDown, ChevronUp, Star, MapPin, Wifi, Coffee, Car, Snowflake, Plus, Heart } from "lucide-react";
import { 
  Box, 
  Paper, 
  Typography, 
  Tab, 
  Tabs, 
  Chip, 
  Card, 
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Container,
  CircularProgress,
  IconButton,
  Rating,
  Badge,
} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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

const HotelResults: React.FC<HotelResultsProps> = ({ 
  hotels, 
  loading,
  city,
  checkIn,
  checkOut
}) => {
  const [, setLocation] = useLocation();
  const [priceRange, setPriceRange] = useState([1000, 15000]);
  const [starRating, setStarRating] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("price-low-high");
  const [expandedHotels, setExpandedHotels] = useState<string[]>([]);
  
  // Get all unique amenities from all hotels
  const amenities = [...new Set(hotels.flatMap(hotel => 
    hotel.amenities && Array.isArray(hotel.amenities) ? hotel.amenities : []
  ))];
  
  const starRatingOptions = [1, 2, 3, 4, 5];
  
  const toggleHotelDetails = (hotelId: string) => {
    setExpandedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId) 
        : [...prev, hotelId]
    );
  };
  
  const handleStarRatingChange = (rating: number) => {
    setStarRating(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };
  
  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };
  
  // Apply filters to the hotels
  const filteredHotels = hotels.filter(hotel => {
    // Get minimum price from room types
    const minPrice = hotel.roomTypes && Array.isArray(hotel.roomTypes) 
      ? Math.min(...hotel.roomTypes.map(room => room.pricing.totalPrice))
      : 0;
    
    // Price filter
    if (minPrice < priceRange[0] || minPrice > priceRange[1]) {
      return false;
    }
    
    // Star rating filter
    if (starRating.length > 0 && !starRating.includes(hotel.starRating)) {
      return false;
    }
    
    // Amenities filter
    if (selectedAmenities.length > 0) {
      const hotelAmenities = hotel.amenities && Array.isArray(hotel.amenities) ? hotel.amenities : [];
      for (const amenity of selectedAmenities) {
        if (!hotelAmenities.includes(amenity)) {
          return false;
        }
      }
    }
    
    return true;
  });
  
  // Sort the filtered hotels
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    // Function to get minimum price from room types
    const getMinPrice = (hotel: Hotel) => {
      return hotel.roomTypes && Array.isArray(hotel.roomTypes) 
        ? Math.min(...hotel.roomTypes.map(room => room.pricing.totalPrice))
        : 0;
    };
    
    switch (sortBy) {
      case "price-low-high":
        return getMinPrice(a) - getMinPrice(b);
      case "price-high-low":
        return getMinPrice(b) - getMinPrice(a);
      case "rating-high-low":
        return (b.reviews && Array.isArray(b.reviews) 
          ? b.reviews.reduce((sum, r) => sum + r.rating, 0) / b.reviews.length 
          : 0) - 
          (a.reviews && Array.isArray(a.reviews) 
            ? a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length 
            : 0);
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

  const [activeTab, setActiveTab] = useState(0);

  const sortOptions = [
    { label: "PRICE", value: "price-low-high", icon: <LocalOfferIcon fontSize="small" color="primary" /> },
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

  // Define columns for DataGrid
  const getHotelRows = () => {
    return sortedHotels.map(hotel => {
      const minPrice = hotel.roomTypes && Array.isArray(hotel.roomTypes) 
        ? Math.min(...hotel.roomTypes.map(room => room.pricing.totalPrice))
        : 0;
      
      // Calculate average rating
      const avgRating = hotel.reviews && Array.isArray(hotel.reviews) && hotel.reviews.length > 0
        ? hotel.reviews.reduce((sum, r) => sum + r.rating, 0) / hotel.reviews.length
        : hotel.starRating;
        
      return {
        id: hotel.id,
        hotel: hotel,
        name: hotel.name,
        location: hotel.city,
        starRating: hotel.starRating,
        avgRating: avgRating,
        price: minPrice,
        amenities: hotel.amenities && Array.isArray(hotel.amenities) ? hotel.amenities : [],
        image: hotel.images && Array.isArray(hotel.images) && hotel.images.length > 0 
          ? hotel.images[0].url 
          : 'https://via.placeholder.com/300x200?text=Hotel+Image'
      };
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 8, mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Filters Sidebar */}
        <Box sx={{ 
          width: { xs: '100%', md: '270px' }, 
          bgcolor: 'white', 
          borderRadius: 2,
          boxShadow: 1,
          p: 2,
          alignSelf: 'flex-start',
          position: 'sticky',
          top: '90px'
        }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Filters</Typography>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
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
              onValueChange={setPriceRange}
              className="w-full"
            />
          </Box>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Star Category</Typography>
            <Grid container spacing={1}>
              {starRatingOptions.map(rating => (
                <Grid item xs={12} key={rating}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox 
                      id={`rating-${rating}`} 
                      checked={starRating.includes(rating)}
                      onCheckedChange={() => handleStarRatingChange(rating)}
                      sx={{ p: 0.5 }}
                    />
                    <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating
                          value={rating}
                          readOnly
                          size="small"
                          sx={{ color: '#FFD700' }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ ml: 'auto', fontWeight: 'bold' }}>
                      ₹{Math.min(...filteredHotels.filter(h => h.starRating === rating).map(h => {
                        return (h.roomTypes && Array.isArray(h.roomTypes)) 
                          ? Math.min(...h.roomTypes.map(room => room.pricing.totalPrice))
                          : 0;
                      }))}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
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
                    sx={{ p: 0.5 }}
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
            className="w-full mt-6 bg-primary text-white py-2 rounded-lg font-medium text-sm"
            variant="contained"
            sx={{ 
              bgcolor: '#008cff', 
              '&:hover': { bgcolor: '#0071ce' },
              fontWeight: 'bold'
            }}
          >
            APPLY FILTERS
          </Button>
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
                  height: '4px',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  bgcolor: '#008cff'
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
                        bgcolor: index === activeTab ? '#008cff' : 'rgba(0, 140, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 0.5
                      }}>
                        {option.icon}
                      </Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: index === activeTab ? 'bold' : 'normal',
                          color: index === activeTab ? '#008cff' : 'text.primary' 
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
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : sortedHotels.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center">
              <h3 className="text-lg font-medium mb-2">No hotels found</h3>
              <p className="text-neutral-400">Try adjusting your filters or search for a different city.</p>
            </div>
          ) : (
            sortedHotels.map((hotel) => {
              // Calculate minimum price
              const minPrice = hotel.roomTypes && Array.isArray(hotel.roomTypes) 
                ? Math.min(...hotel.roomTypes.map(room => room.pricing.totalPrice))
                : 0;
              
              // Calculate average rating
              const avgRating = hotel.reviews && Array.isArray(hotel.reviews) && hotel.reviews.length > 0
                ? hotel.reviews.reduce((sum, r) => sum + r.rating, 0) / hotel.reviews.length
                : hotel.starRating;
              
              return (
                <div className="bg-white rounded-xl overflow-hidden mb-4 search-panel" key={hotel.id}>
                  <div className="flex flex-col md:flex-row">
                    {/* Hotel Image */}
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img 
                        src={hotel.images && Array.isArray(hotel.images) && hotel.images.length > 0 
                          ? hotel.images[0].url 
                          : 'https://via.placeholder.com/300x200?text=Hotel+Image'} 
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-lg px-2 py-1 text-xs font-medium flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {avgRating.toFixed(1)}
                      </div>
                    </div>
                    
                    {/* Hotel Details */}
                    <div className="p-4 flex-1">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{hotel.name}</h3>
                          <div className="flex items-center text-neutral-400 text-sm mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {hotel.address}, {hotel.city}
                          </div>
                          
                          <div className="flex mt-2">
                            {[...Array(hotel.starRating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {hotel.amenities && Array.isArray(hotel.amenities) && hotel.amenities.slice(0, 4).map((amenity, i) => (
                              <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100">
                                {amenity === 'WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                                {amenity === 'Breakfast' && <Coffee className="h-3 w-3 mr-1" />}
                                {amenity === 'Parking' && <Car className="h-3 w-3 mr-1" />}
                                {amenity === 'AC' && <Snowflake className="h-3 w-3 mr-1" />}
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 md:text-right">
                          <div className="text-xs text-neutral-400">Starts from</div>
                          <div className="text-xl font-bold text-primary">₹{minPrice}</div>
                          <div className="text-xs text-neutral-400">per night</div>
                          
                          <Button 
                            className="mt-2 bg-secondary hover:bg-secondary/90 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
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
                            Book Now
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-neutral-200">
                        <Button 
                          variant="ghost"
                          className="text-primary text-sm font-medium flex items-center p-0 h-auto"
                          onClick={() => toggleHotelDetails(hotel.id.toString())}
                        >
                          View Details {expandedHotels.includes(hotel.id.toString()) ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                        </Button>
                        
                        {expandedHotels.includes(hotel.id.toString()) && (
                          <div className="mt-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {hotel.roomTypes && Array.isArray(hotel.roomTypes) && hotel.roomTypes.map((room, i) => (
                                <div key={i} className="border border-neutral-200 rounded-lg p-3">
                                  <h4 className="font-medium">{room.name}</h4>
                                  <div className="text-sm text-neutral-600 mt-1">
                                    {room.description}
                                  </div>
                                  <div className="flex justify-between items-end mt-2">
                                    <div>
                                      <div className="text-xs text-neutral-400">Sleeps {room.maxOccupancy}</div>
                                      <div className="text-xs text-neutral-400 mt-1">
                                        {room.bedType}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm font-bold text-primary">₹{room.pricing.totalPrice}</div>
                                      <div className="text-xs text-neutral-400">per night</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {hotel.description && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium mb-2">About the Hotel</h4>
                                <p className="text-sm text-neutral-600">
                                  {hotel.description}
                                </p>
                              </div>
                            )}
                            
                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-2">Check-in & Check-out</h4>
                              <div className="flex text-sm">
                                <div className="mr-6">
                                  <div className="text-neutral-600">Check-in:</div>
                                  <div className="font-medium">{hotel.checkInTime || "2:00 PM"}</div>
                                </div>
                                <div>
                                  <div className="text-neutral-600">Check-out:</div>
                                  <div className="font-medium">{hotel.checkOutTime || "12:00 PM"}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelResults;