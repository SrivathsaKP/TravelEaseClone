import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useSearchParams } from "@/lib/utils";
import { fetchTrainSearchResults } from "@/lib/api";
import { Train } from "@/lib/types";
import SearchTabs from "@/components/SearchTabs";
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TrainSearch = () => {
  const [location] = useLocation();
  const params = useSearchParams(location);
  
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const date = params.get("date") || new Date().toISOString().split('T')[0];
  
  const [priceRange, setPriceRange] = useState([200, 2000]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [departureTime, setDepartureTime] = useState<string[]>([]);
  const [expandedTrains, setExpandedTrains] = useState<string[]>([]);
  
  const { data, isLoading, error } = useQuery<{data: Train[]}>({
    queryKey: ['/api/trains/search', from, to, date],
    enabled: !!from && !!to && !!date
  });
  
  const trains = data?.data || [];
  
  // Available train classes
  const trainClasses = [
    { code: "1A", name: "First AC" },
    { code: "2A", name: "Second AC" },
    { code: "3A", name: "Third AC" },
    { code: "SL", name: "Sleeper" },
  ];
  
  // Departure time slots
  const departureTimeSlots = [
    { label: "00:00 - 06:00", value: "early-morning" },
    { label: "06:00 - 12:00", value: "morning" },
    { label: "12:00 - 18:00", value: "afternoon" },
    { label: "18:00 - 00:00", value: "evening" }
  ];
  
  const toggleTrainDetails = (trainId: string) => {
    setExpandedTrains(prev => 
      prev.includes(trainId) 
        ? prev.filter(id => id !== trainId) 
        : [...prev, trainId]
    );
  };
  
  const handleClassChange = (classCode: string) => {
    setSelectedClasses(prev => 
      prev.includes(classCode) 
        ? prev.filter(c => c !== classCode) 
        : [...prev, classCode]
    );
  };
  
  const handleDepartureTimeChange = (time: string) => {
    setDepartureTime(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time) 
        : [...prev, time]
    );
  };
  
  // Apply filters to the trains
  const filteredTrains = trains.filter(train => {
    // Class filter
    if (selectedClasses.length > 0) {
      const availableClasses = train.classes.map(c => c.code);
      if (!selectedClasses.some(c => availableClasses.includes(c))) {
        return false;
      }
    }
    
    // Price filter - check against minimum price in any class
    const minPrice = Math.min(...train.classes.map(c => c.fare));
    if (minPrice < priceRange[0] || minPrice > priceRange[1]) {
      return false;
    }
    
    // Departure time filter
    if (departureTime.length > 0) {
      const departureHour = new Date(train.source.departureTime).getHours();
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
        <title>Train Search: {from} to {to} | TravelEase</title>
        <meta name="description" content={`Find the best train tickets from ${from} to ${to}. Compare prices, timings, and book your tickets with TravelEase.`} />
        <meta property="og:title" content={`Train Search: ${from} to ${to} | TravelEase`} />
        <meta property="og:description" content={`Find the best train tickets from ${from} to ${to}. Compare prices, timings, and book your tickets with TravelEase.`} />
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
                defaultValue={[200, 2000]}
                min={200}
                max={2000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
            </div>
            
            <div className="border-b border-neutral-200 pb-4 mb-4">
              <h4 className="text-sm font-medium mb-3">Train Class</h4>
              <div className="space-y-2">
                {trainClasses.map(trainClass => (
                  <div className="flex items-center space-x-2" key={trainClass.code}>
                    <Checkbox 
                      id={`class-${trainClass.code}`} 
                      checked={selectedClasses.includes(trainClass.code)}
                      onCheckedChange={() => handleClassChange(trainClass.code)}
                    />
                    <label 
                      htmlFor={`class-${trainClass.code}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {trainClass.name} ({trainClass.code})
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
                {filteredTrains.length} trains found | {formatDate(date)}
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredTrains.length === 0 ? (
              <div className="bg-white rounded-xl p-6 text-center">
                <h3 className="text-lg font-medium mb-2">No trains found</h3>
                <p className="text-neutral-400">Try adjusting your filters or search for a different date.</p>
              </div>
            ) : (
              filteredTrains.map((train) => (
                <div className="bg-white rounded-xl p-4 mb-4 search-panel" key={train.id}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-3 lg:mb-0">
                      <div className="flex items-center">
                        <div className="font-semibold text-base">{train.name}</div>
                        <Badge variant="outline" className="ml-2 text-xs">{train.trainNumber}</Badge>
                      </div>
                      <div className="text-xs text-neutral-400 mt-1">{train.type} • Runs on {train.daysOfWeek.join(', ')}</div>
                    </div>
                    
                    <div className="flex items-center justify-between lg:justify-center flex-1 mb-3 lg:mb-0">
                      <div className="text-center">
                        <div className="font-medium">{formatTime(train.source.departureTime)}</div>
                        <div className="text-xs text-neutral-400">{train.source.stationCode}</div>
                        <div className="text-xs text-neutral-400">{train.source.stationName}</div>
                      </div>
                      
                      <div className="flex flex-col items-center mx-4">
                        <div className="text-xs text-neutral-400 mb-1">{formatDuration(train.duration)}</div>
                        <div className="w-16 lg:w-24 h-px bg-neutral-300 relative">
                          <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-neutral-400"></div>
                          <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-neutral-400"></div>
                        </div>
                        <div className="text-xs text-neutral-400 mt-1">{train.distance} km</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-medium">{formatTime(train.destination.arrivalTime)}</div>
                        <div className="text-xs text-neutral-400">{train.destination.stationCode}</div>
                        <div className="text-xs text-neutral-400">{train.destination.stationName}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-neutral-200">
                    <div className="flex flex-wrap gap-3 mb-3">
                      {train.classes.map((classOption) => (
                        <div 
                          key={classOption.code} 
                          className={`border rounded-md p-2 min-w-[100px] ${
                            classOption.availability.available > 0 
                              ? 'border-green-300 bg-green-50' 
                              : 'border-red-300 bg-red-50'
                          }`}
                        >
                          <div className="font-medium text-sm">{classOption.name}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs">₹{classOption.fare}</span>
                            <span className={`text-xs ${
                              classOption.availability.available > 0 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {classOption.availability.available > 0 
                                ? `Avl ${classOption.availability.available}` 
                                : classOption.availability.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button 
                        variant="ghost"
                        className="text-primary text-sm font-medium flex items-center p-0 h-auto"
                        onClick={() => toggleTrainDetails(train.id)}
                      >
                        View Details {expandedTrains.includes(train.id) ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                      </Button>
                      
                      <Button className="bg-secondary hover:bg-secondary/90 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
                        Book Now
                      </Button>
                    </div>
                    
                    {expandedTrains.includes(train.id) && (
                      <div className="mt-3 pt-3 border-t border-neutral-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Train Details</h4>
                            <div className="text-xs text-neutral-400 space-y-1">
                              <p>Train Number: {train.trainNumber}</p>
                              <p>Train Name: {train.name}</p>
                              <p>Train Type: {train.type}</p>
                              <p>Distance: {train.distance} km</p>
                              <p>Running Days: {train.daysOfWeek.join(', ')}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Boarding & Destination</h4>
                            <div className="text-xs text-neutral-400 space-y-1">
                              <p>From: {train.source.stationName} ({train.source.stationCode})</p>
                              <p>Departure: {formatDate(train.source.departureTime)} at {formatTime(train.source.departureTime)}</p>
                              <p>To: {train.destination.stationName} ({train.destination.stationCode})</p>
                              <p>Arrival: {formatDate(train.destination.arrivalTime)} at {formatTime(train.destination.arrivalTime)}</p>
                              <p>Duration: {formatDuration(train.duration)}</p>
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

export default TrainSearch;
