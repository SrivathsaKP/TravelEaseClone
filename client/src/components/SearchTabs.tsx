import { useState, useEffect } from "react";
import { useLocation } from 'wouter';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-mobile";
import { 
  PlaneIcon, HotelIcon, TrainIcon, BusIcon, 
  CalendarIcon, UsersIcon, MapPinIcon, ArrowRightIcon,
  PlaneArrivalIcon, PlaneDepartureIcon 
} from "@/lib/icons";

// Type definitions for form states
interface FlightSearchState {
  tripType: 'one-way' | 'round-trip';
  source: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  travelers: string;
}

interface HotelSearchState {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  priceRange: string;
}

interface TrainSearchState {
  source: string;
  destination: string;
  date: string;
  class: string;
}

interface BusSearchState {
  source: string;
  destination: string;
  date: string;
  busType: string;
}

const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const [, setLocation] = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Form states
  const [flightSearch, setFlightSearch] = useState<FlightSearchState>({
    tripType: 'one-way',
    source: '',
    destination: '',
    departureDate: '',
    travelers: '1 Adult, Economy'
  });
  
  const [hotelSearch, setHotelSearch] = useState<HotelSearchState>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Adults, 1 Room',
    priceRange: 'Any Price'
  });
  
  const [trainSearch, setTrainSearchState] = useState<TrainSearchState>({
    source: '',
    destination: '',
    date: '',
    class: 'All Classes'
  });
  
  const [busSearch, setBusSearchState] = useState<BusSearchState>({
    source: '',
    destination: '',
    date: '',
    busType: 'All Types'
  });
  
  // Handle form submissions
  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/flights?from=${flightSearch.source}&to=${flightSearch.destination}&date=${flightSearch.departureDate}`);
  };
  
  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/hotels?location=${hotelSearch.destination}&checkin=${hotelSearch.checkIn}&checkout=${hotelSearch.checkOut}`);
  };
  
  const handleTrainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/trains?from=${trainSearch.source}&to=${trainSearch.destination}&date=${trainSearch.date}`);
  };
  
  const handleBusSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/buses?from=${busSearch.source}&to=${busSearch.destination}&date=${busSearch.date}`);
  };
  
  // Set today's date as the minimum date for date inputs
  const today = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    // Set current date as default for departure/check-in dates
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const dayAfterTomorrowStr = dayAfterTomorrow.toISOString().split('T')[0];
    
    setFlightSearch(prev => ({...prev, departureDate: tomorrowStr}));
    setHotelSearch(prev => ({...prev, checkIn: tomorrowStr, checkOut: dayAfterTomorrowStr}));
    setTrainSearchState(prev => ({...prev, date: tomorrowStr}));
    setBusSearchState(prev => ({...prev, date: tomorrowStr}));
  }, []);

  return (
    <div className="container mx-auto px-4 -mt-6 relative z-10 mb-12">
      <div className="bg-white rounded-xl search-panel">
        <Tabs defaultValue="flights" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 border-b border-neutral-200">
            <TabsTrigger value="flights" className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-4">
              <PlaneIcon className="h-4 w-4 mr-2" /> {!isMobile && "Flights"}
            </TabsTrigger>
            <TabsTrigger value="hotels" className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-4">
              <HotelIcon className="h-4 w-4 mr-2" /> {!isMobile && "Hotels"}
            </TabsTrigger>
            <TabsTrigger value="trains" className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-4">
              <TrainIcon className="h-4 w-4 mr-2" /> {!isMobile && "Trains"}
            </TabsTrigger>
            <TabsTrigger value="buses" className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-4">
              <BusIcon className="h-4 w-4 mr-2" /> {!isMobile && "Buses"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="flights" className="p-6">
            <form onSubmit={handleFlightSearch}>
              <div className="mb-4 flex space-x-4">
                <RadioGroup
                  defaultValue="one-way"
                  value={flightSearch.tripType}
                  onValueChange={(value) => setFlightSearch({...flightSearch, tripType: value as 'one-way' | 'round-trip'})}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-way" id="one-way" />
                    <Label htmlFor="one-way">One Way</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="round-trip" id="round-trip" />
                    <Label htmlFor="round-trip">Round Trip</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">From</Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="Delhi" 
                        value={flightSearch.source}
                        onChange={(e) => setFlightSearch({...flightSearch, source: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <PlaneDepartureIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">To</Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="Jaipur" 
                        value={flightSearch.destination}
                        onChange={(e) => setFlightSearch({...flightSearch, destination: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <PlaneArrivalIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Departure</Label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        min={today}
                        value={flightSearch.departureDate}
                        onChange={(e) => setFlightSearch({...flightSearch, departureDate: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <CalendarIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Travelers & Class</Label>
                    <div className="relative">
                      <Select 
                        value={flightSearch.travelers} 
                        onValueChange={(value) => setFlightSearch({...flightSearch, travelers: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="1 Adult, Economy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 Adult, Economy">1 Adult, Economy</SelectItem>
                          <SelectItem value="2 Adults, Economy">2 Adults, Economy</SelectItem>
                          <SelectItem value="1 Adult, Business">1 Adult, Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button type="submit" className="bg-secondary hover:bg-secondary-dark text-white py-3 px-8 rounded-lg font-medium text-base transition">
                  Search Flights
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="hotels" className="p-6">
            <form onSubmit={handleHotelSearch}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Destination/Property</Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="Jaipur, Rajasthan" 
                        value={hotelSearch.destination}
                        onChange={(e) => setHotelSearch({...hotelSearch, destination: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <MapPinIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Check-in</Label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        min={today}
                        value={hotelSearch.checkIn}
                        onChange={(e) => setHotelSearch({...hotelSearch, checkIn: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <CalendarIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Check-out</Label>
                    <div className="relative">
                      <Input 
                        type="date"
                        min={hotelSearch.checkIn || today}
                        value={hotelSearch.checkOut}
                        onChange={(e) => setHotelSearch({...hotelSearch, checkOut: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <CalendarIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Label className="block text-sm font-medium text-neutral-400 mb-1">Guests & Rooms</Label>
                  <div className="relative">
                    <Select 
                      value={hotelSearch.guests} 
                      onValueChange={(value) => setHotelSearch({...hotelSearch, guests: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="2 Adults, 1 Room" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2 Adults, 1 Room">2 Adults, 1 Room</SelectItem>
                        <SelectItem value="2 Adults, 1 Child, 1 Room">2 Adults, 1 Child, 1 Room</SelectItem>
                        <SelectItem value="4 Adults, 2 Rooms">4 Adults, 2 Rooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="relative">
                  <Label className="block text-sm font-medium text-neutral-400 mb-1">Price per Night</Label>
                  <div className="relative">
                    <Select 
                      value={hotelSearch.priceRange} 
                      onValueChange={(value) => setHotelSearch({...hotelSearch, priceRange: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Any Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Any Price">Any Price</SelectItem>
                        <SelectItem value="Under ₹2,000">Under ₹2,000</SelectItem>
                        <SelectItem value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</SelectItem>
                        <SelectItem value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</SelectItem>
                        <SelectItem value="₹10,000+">₹10,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button type="submit" className="bg-secondary hover:bg-secondary-dark text-white py-3 px-8 rounded-lg font-medium text-base transition">
                  Search Hotels
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="trains" className="p-6">
            <form onSubmit={handleTrainSearch}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">From</Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="Delhi" 
                        value={trainSearch.source}
                        onChange={(e) => setTrainSearchState({...trainSearch, source: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <MapPinIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">To</Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="Jaipur" 
                        value={trainSearch.destination}
                        onChange={(e) => setTrainSearchState({...trainSearch, destination: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <MapPinIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Travel Date</Label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        min={today}
                        value={trainSearch.date}
                        onChange={(e) => setTrainSearchState({...trainSearch, date: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <CalendarIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Class</Label>
                    <div className="relative">
                      <Select 
                        value={trainSearch.class} 
                        onValueChange={(value) => setTrainSearchState({...trainSearch, class: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All Classes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Classes">All Classes</SelectItem>
                          <SelectItem value="Sleeper">Sleeper</SelectItem>
                          <SelectItem value="AC 3 Tier">AC 3 Tier</SelectItem>
                          <SelectItem value="AC 2 Tier">AC 2 Tier</SelectItem>
                          <SelectItem value="AC First Class">AC First Class</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button type="submit" className="bg-secondary hover:bg-secondary-dark text-white py-3 px-8 rounded-lg font-medium text-base transition">
                  Search Trains
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="buses" className="p-6">
            <form onSubmit={handleBusSearch}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">From</Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="Delhi" 
                        value={busSearch.source}
                        onChange={(e) => setBusSearchState({...busSearch, source: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <MapPinIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">To</Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="Jaipur" 
                        value={busSearch.destination}
                        onChange={(e) => setBusSearchState({...busSearch, destination: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <MapPinIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Travel Date</Label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        min={today}
                        value={busSearch.date}
                        onChange={(e) => setBusSearchState({...busSearch, date: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <CalendarIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Bus Type</Label>
                    <div className="relative">
                      <Select 
                        value={busSearch.busType} 
                        onValueChange={(value) => setBusSearchState({...busSearch, busType: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Types">All Types</SelectItem>
                          <SelectItem value="AC Sleeper">AC Sleeper</SelectItem>
                          <SelectItem value="Non-AC Sleeper">Non-AC Sleeper</SelectItem>
                          <SelectItem value="AC Seater">AC Seater</SelectItem>
                          <SelectItem value="Non-AC Seater">Non-AC Seater</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button type="submit" className="bg-secondary hover:bg-secondary-dark text-white py-3 px-8 rounded-lg font-medium text-base transition">
                  Search Buses
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchTabs;
