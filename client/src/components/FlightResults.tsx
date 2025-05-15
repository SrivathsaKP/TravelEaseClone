import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Flight } from "@/lib/types";
import { ChevronDown, ChevronUp, Plus, Clock, Lock } from "lucide-react";
import { 
  Box, 
  Paper, 
  Typography, 
  Tab, 
  Tabs, 
  Chip, 
  Card, 
  CardContent,
  Divider,
  Grid,
  Container,
  LinearProgress,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface FlightResultsProps {
  flights: Flight[];
  loading: boolean;
  sourceCity: string;
  destinationCity: string;
}

const FlightResults: React.FC<FlightResultsProps> = ({ 
  flights, 
  loading,
  sourceCity,
  destinationCity
}) => {
  const [, setLocation] = useLocation();
  const [priceRange, setPriceRange] = useState([1500, 10000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedDepartureTimes, setSelectedDepartureTimes] = useState<string[]>([]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("price-low-high");
  const [expandedFlights, setExpandedFlights] = useState<string[]>([]);
  
  const airlines = [...new Set(flights.map(flight => flight.airline.name))];
  
  const departureTimes = [
    { label: "00:00 - 06:00", value: "early-morning" },
    { label: "06:00 - 12:00", value: "morning" },
    { label: "12:00 - 18:00", value: "afternoon" },
    { label: "18:00 - 00:00", value: "evening" }
  ];
  
  const stopOptions = [
    { label: "Non-stop", value: "non-stop" },
    { label: "1 Stop", value: "one-stop" }
  ];
  
  const toggleFlightDetails = (flightId: string) => {
    setExpandedFlights(prev => 
      prev.includes(flightId) 
        ? prev.filter(id => id !== flightId) 
        : [...prev, flightId]
    );
  };
  
  const handleAirlineChange = (airline: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airline) 
        ? prev.filter(a => a !== airline) 
        : [...prev, airline]
    );
  };
  
  const handleDepartureTimeChange = (time: string) => {
    setSelectedDepartureTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time) 
        : [...prev, time]
    );
  };
  
  const handleStopChange = (stop: string) => {
    setSelectedStops(prev => 
      prev.includes(stop) 
        ? prev.filter(s => s !== stop) 
        : [...prev, stop]
    );
  };
  
  // Apply filters to the flights
  const filteredFlights = flights.filter(flight => {
    // Price filter
    const flightPrice = flight.fare.totalFare;
    if (flightPrice < priceRange[0] || flightPrice > priceRange[1]) {
      return false;
    }
    
    // Airline filter
    if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline.name)) {
      return false;
    }
    
    // Departure time filter
    if (selectedDepartureTimes.length > 0) {
      const departureHour = new Date(flight.source.departureTime).getHours();
      let timeCategory = "";
      
      if (departureHour >= 0 && departureHour < 6) timeCategory = "early-morning";
      else if (departureHour >= 6 && departureHour < 12) timeCategory = "morning";
      else if (departureHour >= 12 && departureHour < 18) timeCategory = "afternoon";
      else timeCategory = "evening";
      
      if (!selectedDepartureTimes.includes(timeCategory)) {
        return false;
      }
    }
    
    // Stop filter
    if (selectedStops.length > 0) {
      const isNonstop = !flight.stops || flight.stops === 0;
      const stopCategory = isNonstop ? "non-stop" : "one-stop";
      
      if (!selectedStops.includes(stopCategory)) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort the filtered flights
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.fare.totalFare - b.fare.totalFare;
      case "price-high-low":
        return b.fare.totalFare - a.fare.totalFare;
      case "duration-shortest":
        return a.duration - b.duration;
      case "departure-earliest":
        return new Date(a.source.departureTime).getTime() - new Date(b.source.departureTime).getTime();
      default:
        return 0;
    }
  });
  
  // Format time from ISO string
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Calculate flight duration in hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const [activeTab, setActiveTab] = useState(0);

  const sortOptions = [
    { label: "CHEAPEST", value: "price-low-high", icon: <CurrencyRupeeIcon fontSize="small" color="primary" /> },
    { label: "NON STOP FIRST", value: "nonstop-first", icon: <AccessTimeIcon fontSize="small" /> },
    { label: "YOU MAY PREFER", value: "recommend", icon: <VerifiedIcon fontSize="small" /> },
    { label: "Other Sort", value: "custom", icon: <PlaylistAddCheckIcon fontSize="small" /> }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Set the sort criteria based on the selected tab
    switch(newValue) {
      case 0:
        setSortBy("price-low-high");
        break;
      case 1: 
        setSortBy("duration-shortest");
        break;
      case 2:
        setSortBy("departure-earliest");
        break;
      case 3:
        // Keep current sort
        break;
      default:
        setSortBy("price-low-high");
    }
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
            <Typography variant="subtitle2" sx={{ mb: 1 }}>One Way Price</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">₹{priceRange[0]}</Typography>
              <Typography variant="caption" color="text.secondary">₹{priceRange[1]}</Typography>
            </Box>
            <Slider
              defaultValue={[1500, 10000]}
              min={1500}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </Box>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Stops From {sourceCity}</Typography>
            <Box sx={{ ml: 1 }}>
              {stopOptions.map(stop => (
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }} key={stop.value}>
                  <Checkbox 
                    id={`stop-${stop.value}`} 
                    checked={selectedStops.includes(stop.value)}
                    onCheckedChange={() => handleStopChange(stop.value)}
                    sx={{ p: 0.5 }}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {stop.label}
                  </Typography>
                  {stop.value === "non-stop" && (
                    <Typography variant="body2" sx={{ ml: 'auto', fontWeight: 'bold' }}>
                      ₹{Math.min(...filteredFlights.filter(f => !f.stops || f.stops === 0).map(f => f.fare.totalFare))}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Departure From {sourceCity}</Typography>
            <Grid container spacing={1} sx={{ ml: 0.5 }}>
              {departureTimes.map(time => (
                <Grid item xs={12} key={time.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox 
                      id={`departure-${time.value}`} 
                      checked={selectedDepartureTimes.includes(time.value)}
                      onCheckedChange={() => handleDepartureTimeChange(time.value)}
                      sx={{ p: 0.5 }}
                    />
                    <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: '16px', 
                        height: '16px', 
                        borderRadius: '50%', 
                        mr: 1, 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: time.value === 'morning' ? '#FFC000' : 
                                 time.value === 'afternoon' ? '#FF4A4A' :
                                 time.value === 'evening' ? '#484848' : '#004bcc'
                      }}>
                        <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: 'white' }}></Box>
                      </Box>
                      <Typography variant="body2">{time.label}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Airlines</Typography>
            <Box sx={{ ml: 1 }}>
              {airlines.map(airline => (
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }} key={airline}>
                  <Checkbox 
                    id={`airline-${airline}`} 
                    checked={selectedAirlines.includes(airline)}
                    onCheckedChange={() => handleAirlineChange(airline)}
                    sx={{ p: 0.5 }}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {airline}
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 'auto', fontWeight: 'bold' }}>
                    ₹{Math.min(...filteredFlights.filter(f => f.airline.name === airline).map(f => f.fare.totalFare))}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        
        {/* Results List */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Flights from {sourceCity} to {destinationCity}</Typography>
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
                      {index === activeTab && (
                        <Typography variant="caption" sx={{ color: '#008cff', fontWeight: 'bold' }}>
                          ₹{Math.min(...filteredFlights.map(f => f.fare.totalFare))} | {formatDuration(Math.min(...filteredFlights.map(f => f.duration)))}
                        </Typography>
                      )}
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
            <Typography variant="body2">Flights sorted by Lowest fares on this route</Typography>
            <Typography variant="body2" sx={{ color: 'orange', fontStyle: 'italic' }}>
              Cheaper Non-stop Flights available on 20 May & 23 May
            </Typography>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : sortedFlights.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>No flights found</Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters or search for a different date.
              </Typography>
            </Paper>
          ) : (
            <Box>
              {sortedFlights.map((flight) => (
                <Paper 
                  key={flight.id} 
                  sx={{ 
                    p: 0, 
                    mb: 2, 
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}
                  elevation={1}
                >
                  {/* Top offer banner */}
                  {Math.random() > 0.5 && (
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
                          'Free Seat with VISA Card*' : 
                          '10% off on Meals | Free Seat with VISA Card*'
                        }
                      </Typography>
                    </Box>
                  )}
                  
                  {/* Flight details */}
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '170px' }}>
                      <Box sx={{ mr: 2 }}>
                        {flight.airline.name === 'IndiGo' ? (
                          <Box sx={{ bgcolor: '#f2f2f2', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                            <Typography variant="caption" sx={{ color: '#3366CC', fontWeight: 'bold' }}>
                              {flight.airline.code}
                            </Typography>
                          </Box>
                        ) : flight.airline.name === 'Akasa Air' ? (
                          <Box sx={{ bgcolor: '#f2f2f2', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                            <Box sx={{ bgcolor: '#FF6B00', width: 28, height: 28, borderRadius: '50%' }}></Box>
                          </Box>
                        ) : (
                          <Box sx={{ bgcolor: '#f2f2f2', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                              {flight.airline.code}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {flight.airline.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {flight.flightNumber}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                      <Box sx={{ textAlign: 'center', width: '75px' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {formatTime(flight.source.departureTime)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {flight.source.airport.code}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mx: 2, flex: 1, maxWidth: '200px', position: 'relative' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block', mb: 0.5 }}>
                          {(!flight.stops || flight.stops === 0) ? `${Math.floor(flight.duration / 60)}h` : ''}
                        </Typography>
                        <Box sx={{ height: '1px', bgcolor: '#CCCCCC', width: '100%', position: 'relative' }}>
                          <Box sx={{ position: 'absolute', top: -2, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#008cff' }}></Box>
                            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#008cff' }}></Box>
                          </Box>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block', mt: 0.5 }}>
                          {!flight.stops || flight.stops === 0 ? 'Non stop' : `${flight.stops} Stop`}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ textAlign: 'center', width: '75px' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {formatTime(flight.destination.arrivalTime)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {flight.destination.airport.code}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ width: '140px', textAlign: 'right' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#008cff' }}>
                          ₹{flight.fare.totalFare}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        per adult
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Button 
                          variant="contained"
                          sx={{ 
                            bgcolor: '#008cff', 
                            color: 'white',
                            '&:hover': { bgcolor: '#0066cc' },
                            px: 2,
                            py: 0.5,
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}
                          onClick={() => {
                            // Create a booking data object to pass to checkout
                            const bookingData = {
                              type: 'flight',
                              amount: flight.fare.totalFare,
                              details: {
                                from: sourceCity,
                                to: destinationCity,
                                date: flight.source.departureTime?.split('T')[0] || new Date().toISOString().split('T')[0],
                                passengers: 1,
                                flightNumber: flight.flightNumber,
                                airline: flight.airline.name,
                                departureTime: formatTime(flight.source.departureTime || ''),
                                arrivalTime: formatTime(flight.destination.arrivalTime || ''),
                                duration: formatDuration(flight.duration)
                              }
                            };
                            
                            // Store booking data in sessionStorage
                            sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
                            
                            // Navigate to checkout page
                            setLocation('/checkout');
                          }}
                        >
                          VIEW PRICES
                        </Button>
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
                        onClick={() => toggleFlightDetails(flight.id)}
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
                      onClick={() => toggleFlightDetails(flight.id)}
                    >
                      View Flight Details
                    </Typography>
                  </Box>
                  
                  {/* Expanded details */}
                  {expandedFlights.includes(flight.id) && (
                    <Box sx={{ p: 2, borderTop: '1px solid #eeeeee' }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle2" gutterBottom>Flight Details</Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="body2">
                              <strong>Baggage:</strong> {flight.baggage}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Cabin Baggage:</strong> {flight.cabinBaggage}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Meal Service:</strong> {flight.mealService}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle2" gutterBottom>Fare Breakdown</Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="body2">
                              <strong>Base Fare:</strong> ₹{flight.fare.baseFare}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Taxes & Fees:</strong> ₹{flight.fare.tax}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#008cff', fontWeight: 'bold' }}>
                              <strong>Total:</strong> ₹{flight.fare.totalFare}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle2" gutterBottom>Cancellation Policy</Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="body2">
                              <strong>Cancellation Fee:</strong> ₹{flight.isRefundable ? "1,200" : "Non-refundable"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Reschedule Fee:</strong> ₹{flight.isRefundable ? "950" : "Non-refundable"}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Paper>
              ))}
              
              {/* Pagination or "Load More" button */}
              {sortedFlights.length > 10 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      color: '#008cff', 
                      borderColor: '#008cff',
                      '&:hover': {
                        borderColor: '#0066cc',
                        bgcolor: 'rgba(0, 140, 255, 0.05)'
                      }
                    }}
                  >
                    Load More Flights
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default FlightResults;
