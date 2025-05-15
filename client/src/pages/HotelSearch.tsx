import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useSearchParams } from "@/lib/utils";
import { Hotel } from "@/lib/types";
import SearchTabs from "@/components/SearchTabs";
import { Helmet } from 'react-helmet';
import HotelResults from "@/components/HotelResults";

const HotelSearch = () => {
  const [location] = useLocation();
  const { getParam } = useSearchParams();
  
  const city = getParam("location") || "";
  const checkIn = getParam("checkin") || new Date().toISOString().split('T')[0];
  const checkOut = getParam("checkout") || (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  })();
  
  const { data, isLoading, error } = useQuery<{data: Hotel[]}>({
    queryKey: ['/api/hotels/search', city, checkIn, checkOut],
    enabled: !!city && !!checkIn && !!checkOut
  });

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
      
      <div className="container mx-auto px-4 py-8 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-bold mb-4">Hotels in {city}</h1>
          <div className="flex flex-wrap items-center text-sm text-neutral-600">
            <div className="mr-4 mb-2">
              <span className="font-medium">Check-in:</span> {new Date(checkIn).toLocaleDateString()}
            </div>
            <div className="mr-4 mb-2">
              <span className="font-medium">Check-out:</span> {new Date(checkOut).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <span className="font-medium">Stay:</span> {
                Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
              } nights
            </div>
          </div>
        </div>
        
        <HotelResults 
          hotels={data?.data || []}
          loading={isLoading}
          city={city}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      </div>
    </>
  );
};

export default HotelSearch;
