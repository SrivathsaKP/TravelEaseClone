import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useSearchParams } from "@/lib/utils";
import { fetchHotelSearchResults } from "@/lib/api";
import { Hotel } from "@/lib/types";
import SearchTabs from "@/components/SearchTabs";
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";

const HotelSearch = () => {
  const [location] = useLocation();
  const params = useSearchParams(location);
  
  const city = params.get("location") || "";
  const checkIn = params.get("checkin") || new Date().toISOString().split('T')[0];
  const checkOut = params.get("checkout") || (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  })();
  
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [starRating, setStarRating] = useState<number[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  
  const { data, isLoading, error } = useQuery<{data: Hotel[]}>({
    queryKey: ['/api/hotels/search', city, checkIn, checkOut],
    enabled: !!city && !!checkIn && !!checkOut
  });
  
  const hotels = data?.data || [];
  
  // Filter based on user selections
  const filteredHotels = hotels.filter(hotel => {
    // Price filter
    const minPrice = Math.min(...hotel.roomTypes.map(room => room.pricing.totalPrice));
    if (minPrice < priceRange[0] || minPrice > priceRange[1]) {
      return false;
    }
    
    // Star rating filter
    if (starRating.length > 0 && !starRating.includes(hotel.starRating)) {
      return false;
    }
    
    // Amenities filter
    if (amenities.length > 0) {
      const hotelAmenities = hotel.amenities || [];
      if (!amenities.every(amenity => hotelAmenities.includes(amenity))) {
        return false;
      }
    }
    
    return true;
  });
  
  // Get all available amenities for filtering
  const allAmenities = [...new Set(hotels.flatMap(hotel => hotel.amenities || []))];
  
  const handleStarRatingChange = (rating: number) => {
    setStarRating(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };
  
  const handleAmenityChange = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  return (
    <>
      <Helmet>
        <title>Hotel Search: {city} | TravelEase</title>
        <meta name="description" content={`Find the best hotels in ${city}. Compare prices, amenities, and book your stay with TravelEase.`} />
        <meta property="og:title" content={`Hotel Search: ${city} | TravelEase`} />
        <meta property="og:description" content={`Find the best hotels in ${city}. Compare prices, amenities, and book your stay with TravelEase.`} />
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
                defaultValue={[1000, 10000]}
                min={1000}
                max={10000}
                step={500}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
            </div>
            
            <div className="border-b border-neutral-200 pb-4 mb-4">
              <h4 className="text-sm font-medium mb-3">Star Rating</h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div className="flex items-center space-x-2" key={rating}>
                    <Checkbox 
                      id={`star-${rating}`} 
                      checked={starRating.includes(rating)}
                      onCheckedChange={() => handleStarRatingChange(rating)}
                    />
                    <label 
                      htmlFor={`star-${rating}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                    >
                      {rating} <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Amenities</h4>
              <div className="space-y-2">
                {allAmenities.slice(0, 8).map((amenity, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <Checkbox 
                      id={`amenity-${index}`} 
                      checked={amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityChange(amenity)}
                    />
                    <label 
                      htmlFor={`amenity-${index}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity}
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
              <h2 className="text-xl font-semibold heading">Hotels in {city}</h2>
              <div className="text-sm text-neutral-400">
                {filteredHotels.length} hotels found
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredHotels.length === 0 ? (
              <div className="bg-white rounded-xl p-6 text-center">
                <h3 className="text-lg font-medium mb-2">No hotels found</h3>
                <p className="text-neutral-400">Try adjusting your filters or search for a different location.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHotels.map(hotel => (
                  <div key={hotel.id} className="bg-white rounded-xl overflow-hidden search-panel">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="md:col-span-1">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={hotel.images[0]?.url || "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"} 
                            alt={hotel.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="p-4 md:col-span-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg heading">{hotel.name}</h3>
                            <div className="flex items-center text-sm text-neutral-400 mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {hotel.address}, {hotel.city}
                            </div>
                          </div>
                          <div className="flex items-center bg-green-50 rounded-full px-2 py-1 text-xs font-medium text-green-700">
                            {hotel.starRating} <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {hotel.amenities?.slice(0, 4).map((amenity, index) => (
                            <span key={index} className="bg-neutral-100 text-neutral-400 rounded-full px-2 py-1 text-xs">{amenity}</span>
                          ))}
                          {hotel.amenities && hotel.amenities.length > 4 && (
                            <span className="bg-neutral-100 text-neutral-400 rounded-full px-2 py-1 text-xs">+{hotel.amenities.length - 4} more</span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <div className="text-xs text-neutral-400">Starts from</div>
                            <div className="text-xl font-bold text-primary">
                              ₹{Math.min(...hotel.roomTypes.map(room => room.pricing.totalPrice))}
                            </div>
                            <div className="text-xs text-neutral-400">per night</div>
                          </div>
                          <Button className="bg-secondary hover:bg-secondary/90 text-white">
                            View Rooms
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelSearch;
