import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Flight } from "@/lib/types";
import { ChevronDown, ChevronUp } from "lucide-react";

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

  return (
    <div className="container mx-auto px-4 mb-12">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-80 bg-white rounded-xl p-5 search-panel self-start sticky top-20">
          <h3 className="text-lg font-semibold mb-4 heading">Filters</h3>
          
          <div className="border-b border-neutral-200 pb-4 mb-4">
            <h4 className="text-sm font-medium mb-3">Price Range</h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-400">₹{priceRange[0]}</span>
              <span className="text-xs text-neutral-400">₹{priceRange[1]}</span>
            </div>
            <Slider
              defaultValue={[1500, 10000]}
              min={1500}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </div>
          
          <div className="border-b border-neutral-200 pb-4 mb-4">
            <h4 className="text-sm font-medium mb-3">Airlines</h4>
            <div className="space-y-2">
              {airlines.map(airline => (
                <div className="flex items-center space-x-2" key={airline}>
                  <Checkbox 
                    id={`airline-${airline}`} 
                    checked={selectedAirlines.includes(airline)}
                    onCheckedChange={() => handleAirlineChange(airline)}
                  />
                  <label 
                    htmlFor={`airline-${airline}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {airline}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-b border-neutral-200 pb-4 mb-4">
            <h4 className="text-sm font-medium mb-3">Departure Time</h4>
            <div className="space-y-2">
              {departureTimes.map(time => (
                <div className="flex items-center space-x-2" key={time.value}>
                  <Checkbox 
                    id={`departure-${time.value}`} 
                    checked={selectedDepartureTimes.includes(time.value)}
                    onCheckedChange={() => handleDepartureTimeChange(time.value)}
                  />
                  <label 
                    htmlFor={`departure-${time.value}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {time.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Stop</h4>
            <div className="space-y-2">
              {stopOptions.map(stop => (
                <div className="flex items-center space-x-2" key={stop.value}>
                  <Checkbox 
                    id={`stop-${stop.value}`} 
                    checked={selectedStops.includes(stop.value)}
                    onCheckedChange={() => handleStopChange(stop.value)}
                  />
                  <label 
                    htmlFor={`stop-${stop.value}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {stop.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Button className="w-full mt-6 bg-primary text-white py-2 rounded-lg font-medium text-sm">
            Apply Filters
          </Button>
        </div>
        
        {/* Results List */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold heading">{sourceCity} to {destinationCity}</h2>
            <div className="flex items-center">
              <span className="text-sm text-neutral-400 mr-2">Sort by:</span>
              <select 
                className="text-sm border border-neutral-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="duration-shortest">Duration: Shortest First</option>
                <option value="departure-earliest">Departure: Earliest First</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : sortedFlights.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center">
              <h3 className="text-lg font-medium mb-2">No flights found</h3>
              <p className="text-neutral-400">Try adjusting your filters or search for a different date.</p>
            </div>
          ) : (
            sortedFlights.map((flight) => (
              <div className="bg-white rounded-xl p-4 mb-4 search-panel" key={flight.id}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-3 md:mb-0">
                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mr-3">
                      {flight.airline.code}
                    </div>
                    <div>
                      <div className="font-medium">{flight.airline.name}</div>
                      <div className="text-xs text-neutral-400">{flight.flightNumber}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-center flex-1 mb-3 md:mb-0">
                    <div className="text-center">
                      <div className="font-medium">{formatTime(flight.source.departureTime)}</div>
                      <div className="text-xs text-neutral-400">{flight.source.airport.code}</div>
                    </div>
                    
                    <div className="flex flex-col items-center mx-4">
                      <div className="text-xs text-neutral-400 mb-1">{formatDuration(flight.duration)}</div>
                      <div className="w-20 md:w-32 h-px bg-neutral-300 relative">
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-neutral-400"></div>
                      </div>
                      <div className="text-xs text-neutral-400 mt-1">Non-stop</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-medium">{formatTime(flight.destination.arrivalTime)}</div>
                      <div className="text-xs text-neutral-400">{flight.destination.airport.code}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="text-lg font-bold text-primary">₹{flight.fare.totalFare}</div>
                    <div className="text-xs text-neutral-400">per person</div>
                    <Button 
                      className="mt-2 bg-secondary hover:bg-secondary/90 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
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
                      Book Now
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-neutral-200">
                  <Button 
                    variant="ghost"
                    className="text-primary text-sm font-medium flex items-center p-0 h-auto"
                    onClick={() => toggleFlightDetails(flight.id)}
                  >
                    View Details {expandedFlights.includes(flight.id) ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                  </Button>
                  
                  {expandedFlights.includes(flight.id) && (
                    <div className="mt-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Flight Details</h4>
                          <div className="text-xs text-neutral-400">
                            <p>Baggage: {flight.baggage}</p>
                            <p>Cabin Baggage: {flight.cabinBaggage}</p>
                            <p>Meal Service: {flight.mealService}</p>
                            <p>Refundable: {flight.isRefundable ? "Yes" : "No"}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Fare Breakdown</h4>
                          <div className="text-xs text-neutral-400">
                            <p>Base Fare: ₹{flight.fare.baseFare}</p>
                            <p>Taxes & Fees: ₹{flight.fare.tax}</p>
                            <p className="font-medium text-neutral-800">Total: ₹{flight.fare.totalFare}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Cancellation</h4>
                          <div className="text-xs text-neutral-400">
                            <p>Cancellation Fee: ₹{flight.isRefundable ? "1,200" : "Non-refundable"}</p>
                            <p>Reschedule Fee: ₹{flight.isRefundable ? "950" : "Non-refundable"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
