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
import { CitySelect } from "@/components/ui/city-select";

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
  
  // New search states
  interface HomestaySearchState {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    propertyType: string;
  }
  
  const [homestaySearch, setHomestaySearch] = useState<HomestaySearchState>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Adults',
    propertyType: 'All Properties'
  });
  
  interface CabSearchState {
    source: string;
    destination: string;
    pickupDate: string;
    pickupTime: string;
    cabType: string;
  }
  
  const [cabSearch, setCabSearch] = useState<CabSearchState>({
    source: '',
    destination: '',
    pickupDate: '',
    pickupTime: '12:00',
    cabType: 'All Cabs'
  });
  
  interface InsuranceSearchState {
    travelType: 'domestic' | 'international';
    travelers: string;
    startDate: string;
    duration: string;
  }
  
  const [insuranceSearch, setInsuranceSearch] = useState<InsuranceSearchState>({
    travelType: 'domestic',
    travelers: '1 Adult',
    startDate: '',
    duration: '7 days'
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
  
  const handleHomestaySearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/homestays?location=${homestaySearch.destination}&checkIn=${homestaySearch.checkIn}&checkOut=${homestaySearch.checkOut}&guests=${homestaySearch.guests}&type=${homestaySearch.propertyType}`);
  };
  
  const handleCabSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/cabs?from=${cabSearch.source}&to=${cabSearch.destination}&date=${cabSearch.pickupDate}&time=${cabSearch.pickupTime}&type=${cabSearch.cabType}`);
  };
  
  const handleInsuranceSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/insurance?type=${insuranceSearch.travelType}&travelers=${insuranceSearch.travelers}&startDate=${insuranceSearch.startDate}&duration=${insuranceSearch.duration}`);
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
    
    // Initialize new search states with dates
    setHomestaySearch(prev => ({...prev, checkIn: tomorrowStr, checkOut: dayAfterTomorrowStr}));
    setCabSearch(prev => ({...prev, pickupDate: tomorrowStr}));
    setInsuranceSearch(prev => ({...prev, startDate: tomorrowStr}));
  }, []);

  return (
    <div className="container mx-auto px-4 -mt-6 relative z-10 mb-12">
      <div className="bg-white rounded-xl search-panel">
        <Tabs defaultValue="flights" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-7 border-b border-neutral-200">
            <TabsTrigger value="flights" className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-4">
              <PlaneIcon className="h-4 w-4 mr-2" /> {!isMobile && "Flights"}
            </TabsTrigger>
            <TabsTrigger value="hotels" className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-4">
              <HotelIcon className="h-4 w-4 mr-2" /> {!isMobile && "Hotels"}
            </TabsTrigger>
            <TabsTrigger value="homestays" className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg> {!isMobile && "Homestays"}
            </TabsTrigger>
            <TabsTrigger value="trains" className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-4">
              <TrainIcon className="h-4 w-4 mr-2" /> {!isMobile && "Trains"}
            </TabsTrigger>
            <TabsTrigger value="buses" className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-4">
              <BusIcon className="h-4 w-4 mr-2" /> {!isMobile && "Buses"}
            </TabsTrigger>
            <TabsTrigger value="cabs" className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"></path>
                <circle cx="6.5" cy="16.5" r="2.5"></circle>
                <circle cx="16.5" cy="16.5" r="2.5"></circle>
              </svg> {!isMobile && "Cabs"}
            </TabsTrigger>
            <TabsTrigger value="insurance" className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg> {!isMobile && "Insurance"}
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
                    <CitySelect 
                      value={flightSearch.source}
                      onChange={(value) => setFlightSearch({...flightSearch, source: value})}
                      placeholder="Select departure city"
                    />
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">To</Label>
                    <CitySelect 
                      value={flightSearch.destination}
                      onChange={(value) => setFlightSearch({...flightSearch, destination: value})}
                      placeholder="Select destination city"
                    />
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
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-lg font-medium text-base transition shadow-md hover:shadow-lg">
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
                    <CitySelect 
                      value={hotelSearch.destination}
                      onChange={(value) => setHotelSearch({...hotelSearch, destination: value})}
                      placeholder="Select destination"
                    />
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
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-lg font-medium text-base transition shadow-md hover:shadow-lg">
                  Search Hotels
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="homestays" className="p-6">
            <form onSubmit={handleHomestaySearch}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">City or Location</Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="Jaipur, Rajasthan" 
                        value={homestaySearch.destination}
                        onChange={(e) => setHomestaySearch({...homestaySearch, destination: e.target.value})}
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
                        value={homestaySearch.checkIn}
                        onChange={(e) => setHomestaySearch({...homestaySearch, checkIn: e.target.value})}
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
                        min={homestaySearch.checkIn || today}
                        value={homestaySearch.checkOut}
                        onChange={(e) => setHomestaySearch({...homestaySearch, checkOut: e.target.value})}
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
                  <Label className="block text-sm font-medium text-neutral-400 mb-1">Guests</Label>
                  <div className="relative">
                    <Select 
                      value={homestaySearch.guests} 
                      onValueChange={(value) => setHomestaySearch({...homestaySearch, guests: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="2 Adults" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 Adult">1 Adult</SelectItem>
                        <SelectItem value="2 Adults">2 Adults</SelectItem>
                        <SelectItem value="2 Adults, 1 Child">2 Adults, 1 Child</SelectItem>
                        <SelectItem value="3 Adults">3 Adults</SelectItem>
                        <SelectItem value="4 Adults">4 Adults</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="relative">
                  <Label className="block text-sm font-medium text-neutral-400 mb-1">Property Type</Label>
                  <div className="relative">
                    <Select 
                      value={homestaySearch.propertyType} 
                      onValueChange={(value) => setHomestaySearch({...homestaySearch, propertyType: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Properties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Properties">All Properties</SelectItem>
                        <SelectItem value="Entire Home">Entire Home</SelectItem>
                        <SelectItem value="Private Room">Private Room</SelectItem>
                        <SelectItem value="Shared Room">Shared Room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-lg font-medium text-base transition shadow-md hover:shadow-lg">
                  Search Homestays
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
                    <CitySelect 
                      value={trainSearch.source}
                      onChange={(value) => setTrainSearchState({...trainSearch, source: value})}
                      placeholder="Select departure station"
                    />
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">To</Label>
                    <CitySelect 
                      value={trainSearch.destination}
                      onChange={(value) => setTrainSearchState({...trainSearch, destination: value})}
                      placeholder="Select destination station"
                    />
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
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-lg font-medium text-base transition shadow-md hover:shadow-lg">
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
                    <CitySelect 
                      value={busSearch.source}
                      onChange={(value) => setBusSearchState({...busSearch, source: value})}
                      placeholder="Select departure city"
                    />
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">To</Label>
                    <CitySelect 
                      value={busSearch.destination}
                      onChange={(value) => setBusSearchState({...busSearch, destination: value})}
                      placeholder="Select destination city"
                    />
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
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-lg font-medium text-base transition shadow-md hover:shadow-lg">
                  Search Buses
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="cabs" className="p-6">
            <form onSubmit={handleCabSearch}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Pickup Location</Label>
                    <CitySelect 
                      value={cabSearch.source}
                      onChange={(value) => setCabSearch({...cabSearch, source: value})}
                      placeholder="Select pickup location"
                    />
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Dropoff Location</Label>
                    <CitySelect 
                      value={cabSearch.destination}
                      onChange={(value) => setCabSearch({...cabSearch, destination: value})}
                      placeholder="Select dropoff location"
                    />
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Pickup Date</Label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        min={today}
                        value={cabSearch.pickupDate}
                        onChange={(e) => setCabSearch({...cabSearch, pickupDate: e.target.value})}
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
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Pickup Time</Label>
                    <div className="relative">
                      <Input 
                        type="time" 
                        value={cabSearch.pickupTime}
                        onChange={(e) => setCabSearch({...cabSearch, pickupTime: e.target.value})}
                        className="pl-3 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="relative">
                  <Label className="block text-sm font-medium text-neutral-400 mb-1">Cab Type</Label>
                  <div className="relative">
                    <Select 
                      value={cabSearch.cabType} 
                      onValueChange={(value) => setCabSearch({...cabSearch, cabType: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Cabs" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Cabs">All Cabs</SelectItem>
                        <SelectItem value="Mini">Mini (4 Seater)</SelectItem>
                        <SelectItem value="Sedan">Sedan (4 Seater)</SelectItem>
                        <SelectItem value="SUV">SUV (6 Seater)</SelectItem>
                        <SelectItem value="Luxury">Luxury Cars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-lg font-medium text-base transition shadow-md hover:shadow-lg">
                  Search Cabs
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="insurance" className="p-6">
            <form onSubmit={handleInsuranceSearch}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Travel Type</Label>
                    <div className="relative">
                      <Select 
                        value={insuranceSearch.travelType} 
                        onValueChange={(value: 'domestic' | 'international') => setInsuranceSearch({...insuranceSearch, travelType: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Domestic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="domestic">Domestic</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Travelers</Label>
                    <div className="relative">
                      <Select 
                        value={insuranceSearch.travelers} 
                        onValueChange={(value) => setInsuranceSearch({...insuranceSearch, travelers: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="1 Adult" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 Adult">1 Adult</SelectItem>
                          <SelectItem value="2 Adults">2 Adults</SelectItem>
                          <SelectItem value="2 Adults, 1 Child">2 Adults, 1 Child</SelectItem>
                          <SelectItem value="2 Adults, 2 Children">2 Adults, 2 Children</SelectItem>
                          <SelectItem value="Family Plan">Family Plan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <div className="relative">
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Start Date</Label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        min={today}
                        value={insuranceSearch.startDate}
                        onChange={(e) => setInsuranceSearch({...insuranceSearch, startDate: e.target.value})}
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
                    <Label className="block text-sm font-medium text-neutral-400 mb-1">Trip Duration</Label>
                    <div className="relative">
                      <Select 
                        value={insuranceSearch.duration} 
                        onValueChange={(value) => setInsuranceSearch({...insuranceSearch, duration: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="7 days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7 days">7 days</SelectItem>
                          <SelectItem value="15 days">15 days</SelectItem>
                          <SelectItem value="30 days">30 days</SelectItem>
                          <SelectItem value="45 days">45 days</SelectItem>
                          <SelectItem value="60 days">60 days</SelectItem>
                          <SelectItem value="90 days">90 days</SelectItem>
                          <SelectItem value="180 days">180 days</SelectItem>
                          <SelectItem value="365 days">365 days (Annual)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-lg font-medium text-base transition shadow-md hover:shadow-lg">
                  Search Insurance Plans
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
