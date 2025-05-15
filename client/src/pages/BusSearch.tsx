import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useSearchParams } from "@/lib/utils";
import { fetchBusSearchResults } from "@/lib/api";
import { Bus } from "@/lib/types";
import SearchTabs from "@/components/SearchTabs";
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BusSearch = () => {
  const [location] = useLocation();
  const params = useSearchParams(location);
  
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const date = params.get("date") || new Date().toISOString().split('T')[0];
  
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [selectedBusTypes, setSelectedBusTypes] = useState<string[]>([]);
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [departureTime, setDepartureTime] = useState<string[]>([]);
  const [expandedBuses, setExpandedBuses] = useState<string[]>([]);
  
  const { data, isLoading, error } = useQuery<{data: Bus[]}>({
    queryKey: ['/api/buses/search', from, to, date],
    enabled: !!from && !!to && !!date
  });
  
  const buses = data?.data || [];
  
  // Get all available bus operators
  const busOperators = [...new Set(buses.map(bus => bus.operatorName))];
  
  // Get all available bus types
  const busTypes = [...new Set(buses.map(bus => bus.busType))];
  
  // Departure time slots
  const departureTimeSlots = [
    { label: "00:00 - 06:00", value: "early-morning" },
    { label: "06:00 - 12:00", value: "morning" },
    { label: "12:00 - 18:00", value: "afternoon" },
    { label: "18:00 - 00:00", value: "evening" }
  ];
  
  const toggleBusDetails = (busId: string) => {
    setExpandedBuses(prev => 
      prev.includes(busId) 
        ? prev.filter(id => id !== busId) 
        : [...prev, busId]
    );
  };
  
  const handleBusTypeChange = (busType: string) => {
    setSelectedBusTypes(prev => 
      prev.includes(busType) 
        ? prev.filter(bt => bt !== busType) 
        : [...prev, busType]
    );
  };
  
  const handleOperatorChange = (operator: string) => {
    setSelectedOperators(prev => 
      prev.includes(operator) 
        ? prev.filter(op => op !== operator) 
        : [...prev, operator]
    );
  };
  
  const handleDepartureTimeChange = (time: string) => {
    setDepartureTime(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time) 
        : [...prev, time]
    );
  };
  
  // Apply filters to the buses
  const filteredBuses = buses.filter(bus => {
    // Price filter
    if (bus.fare < priceRange[0] || bus.fare > priceRange[1]) {
      return false;
    }
    
    // Bus type filter
    if (selectedBusTypes.length > 0 && !selectedBusTypes.includes(bus.busType)) {
      return false;
    }
    
    // Operator filter
    if (selectedOperators.length > 0 && !selectedOperators.includes(bus.operatorName)) {
      return false;
    }
    
    // Departure time filter
    if (departureTime.length > 0) {
      const departureHour = new Date(bus.source.time).getHours();
      let timeCategory = "";
      
      if (departureHour >= 0 && departureHour < 6) timeCategory = "early-morning";
      else if (departureHour >= 6 && departureHour < 12) timeCategory = "morning";
      else if (departureHour >= 12 && departureHour < 18) timeCategory = "afternoon";
      else timeCategory = "evening";
      
      if (!departureTime.includes(timeCategory)) {
        return false;
      }
    }
    
    return true;
  });
  
  // Format time from ISO string
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date from ISO string
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    });
  };
  
  // Calculate duration in hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <>
      <Helmet>
        <title>Bus Search: {from} to {to} | TravelEase</title>
        <meta name="description" content={`Find the best bus tickets from ${from} to ${to}. Compare prices, timings, and book your tickets with TravelEase.`} />
        <meta property="og:title" content={`Bus Search: ${from} to ${to} | TravelEase`} />
        <meta property="og:description" content={`Find the best bus tickets from ${from} to ${to}. Compare prices, timings, and book your tickets with TravelEase.`} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="bg-primary h-24 md:h-32"></div>
      <SearchTabs />
      
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
                defaultValue={[500, 2000]}
                min={500}
                max={2000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
            </div>
            
            <div className="border-b border-neutral-200 pb-4 mb-4">
              <h4 className="text-sm font-medium mb-3">Bus Type</h4>
              <div className="space-y-2">
                {busTypes.map((type, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <Checkbox 
                      id={`type-${index}`} 
                      checked={selectedBusTypes.includes(type)}
                      onCheckedChange={() => handleBusTypeChange(type)}
                    />
                    <label 
                      htmlFor={`type-${index}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-b border-neutral-200 pb-4 mb-4">
              <h4 className="text-sm font-medium mb-3">Bus Operators</h4>
              <div className="space-y-2">
                {busOperators.map((operator, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <Checkbox 
                      id={`operator-${index}`} 
                      checked={selectedOperators.includes(operator)}
                      onCheckedChange={() => handleOperatorChange(operator)}
                    />
                    <label 
                      htmlFor={`operator-${index}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {operator}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Departure Time</h4>
              <div className="space-y-2">
                {departureTimeSlots.map(slot => (
                  <div className="flex items-center space-x-2" key={slot.value}>
                    <Checkbox 
                      id={`departure-${slot.value}`} 
                      checked={departureTime.includes(slot.value)}
                      onCheckedChange={() => handleDepartureTimeChange(slot.value)}
                    />
                    <label 
                      htmlFor={`departure-${slot.value}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {slot.label}
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
              <h2 className="text-xl font-semibold heading">{from} to {to}</h2>
              <div className="text-sm text-neutral-400">
                {filteredBuses.length} buses found | {formatDate(date)}
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredBuses.length === 0 ? (
              <div className="bg-white rounded-xl p-6 text-center">
                <h3 className="text-lg font-medium mb-2">No buses found</h3>
                <p className="text-neutral-400">Try adjusting your filters or search for a different date.</p>
              </div>
            ) : (
              filteredBuses.map((bus) => (
                <div className="bg-white rounded-xl p-4 mb-4 search-panel" key={bus.id}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-3 lg:mb-0">
                      <div className="font-semibold text-base">{bus.operatorName}</div>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs">{bus.busType}</Badge>
                        {bus.rating && (
                          <div className="flex items-center ml-2 bg-green-50 rounded-full px-2 py-0.5 text-xs font-medium text-green-700">
                            {bus.rating} <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between lg:justify-center flex-1 mb-3 lg:mb-0">
                      <div className="text-center">
                        <div className="font-medium">{formatTime(bus.source.time)}</div>
                        <div className="text-xs text-neutral-400">{bus.source.city}</div>
                        <div className="text-xs text-neutral-400">{bus.source.terminal}</div>
                      </div>
                      
                      <div className="flex flex-col items-center mx-4">
                        <div className="text-xs text-neutral-400 mb-1">{formatDuration(bus.duration)}</div>
                        <div className="w-16 lg:w-24 h-px bg-neutral-300 relative">
                          <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-neutral-400"></div>
                          <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-neutral-400"></div>
                        </div>
                        <div className="text-xs text-neutral-400 mt-1">{bus.distance} km</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-medium">{formatTime(bus.destination.time)}</div>
                        <div className="text-xs text-neutral-400">{bus.destination.city}</div>
                        <div className="text-xs text-neutral-400">{bus.destination.terminal}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="text-lg font-bold text-primary">₹{bus.fare}</div>
                      <div className="text-xs text-neutral-400">per seat</div>
                      <div className="text-xs text-green-600">{bus.availableSeats} seats left</div>
                      <Button className="mt-2 bg-secondary hover:bg-secondary/90 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
                        Select Seats
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-neutral-200">
                    <div className="flex justify-between items-center">
                      <Button 
                        variant="ghost"
                        className="text-primary text-sm font-medium flex items-center p-0 h-auto"
                        onClick={() => toggleBusDetails(bus.id)}
                      >
                        View Details {expandedBuses.includes(bus.id) ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                      </Button>
                      
                      <div className="flex items-center text-xs">
                        {bus.amenities?.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="bg-neutral-100 text-neutral-400 rounded-full px-2 py-1 text-xs mr-1">{amenity}</span>
                        ))}
                        {bus.amenities && bus.amenities.length > 3 && (
                          <span className="bg-neutral-100 text-neutral-400 rounded-full px-2 py-1 text-xs">+{bus.amenities.length - 3}</span>
                        )}
                      </div>
                    </div>
                    
                    {expandedBuses.includes(bus.id) && (
                      <div className="mt-3 pt-3 border-t border-neutral-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Bus Details</h4>
                            <div className="text-xs text-neutral-400 space-y-1">
                              <p>Operator: {bus.operatorName}</p>
                              <p>Bus Type: {bus.busType}</p>
                              <p>Bus Number: {bus.busNumber}</p>
                              <p>Total Seats: {bus.totalSeats}</p>
                              <p>Available Seats: {bus.availableSeats}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Amenities</h4>
                            <div className="flex flex-wrap gap-1">
                              {bus.amenities?.map((amenity, index) => (
                                <span key={index} className="bg-neutral-100 text-neutral-400 rounded-full px-2 py-1 text-xs mb-1">{amenity}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Boarding & Drop Points</h4>
                            <div className="text-xs text-neutral-400">
                              <p className="font-medium text-neutral-500 mb-1">Boarding Points:</p>
                              {bus.boardingPoints?.map((point, index) => (
                                <div key={index} className="mb-1">
                                  <p>{point.name} - {formatTime(point.time)}</p>
                                  <p className="text-xs opacity-75">{point.address}</p>
                                </div>
                              ))}
                              <p className="font-medium text-neutral-500 mt-2 mb-1">Dropping Points:</p>
                              {bus.droppingPoints?.map((point, index) => (
                                <div key={index} className="mb-1">
                                  <p>{point.name} - {formatTime(point.time)}</p>
                                  <p className="text-xs opacity-75">{point.address}</p>
                                </div>
                              ))}
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
    </>
  );
};

export default BusSearch;
