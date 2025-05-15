import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MapPinIcon, CalendarIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";

export default function HomestaySearch() {
  const [locationPath] = useLocation();
  const params = new URLSearchParams(locationPath.split('?')[1] || '');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  
  const searchLocation = params.get('location') || '';
  const checkIn = params.get('checkIn') || '';
  const checkOut = params.get('checkOut') || '';
  const guests = params.get('guests') || '';
  const propertyType = params.get('type') || 'All Properties';
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['/api/homestays/search', searchLocation, checkIn, checkOut, guests, propertyType],
    enabled: !!(searchLocation && checkIn && checkOut)
  });
  
  useEffect(() => {
    document.title = `Homestay Search - ${searchLocation} | TravelEase`;
  }, [searchLocation]);
  
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const difference = end.getTime() - start.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  };
  
  const nights = calculateNights();
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Finding Homestays in {searchLocation}</h1>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Skeleton className="h-8 w-40 mb-2" />
              <Skeleton className="h-6 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="border-t pt-4">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <Skeleton className="h-8 w-40 mb-2" />
                <Skeleton className="h-6 w-64" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="border-t pt-4">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Unable to fetch homestay results. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (data && data.data && data.data.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <Alert className="mb-6">
          <AlertTitle>No Homestays Found</AlertTitle>
          <AlertDescription>
            Sorry, we couldn't find any homestays matching your search criteria. Try different dates or location.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (!data || !data.data) {
    return null;
  }
  
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-2">Homestay Results</h1>
      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
        <div className="flex items-center mr-4 mb-2">
          <MapPinIcon className="h-4 w-4 mr-1" /> {searchLocation}
        </div>
        <div className="flex items-center mr-4 mb-2">
          <CalendarIcon className="h-4 w-4 mr-1" /> 
          {new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - 
          {new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
          <span className="ml-1">({nights} {nights === 1 ? 'night' : 'nights'})</span>
        </div>
        <div className="mb-2">{guests}</div>
        {propertyType !== 'All Properties' && (
          <Badge variant="outline" className="ml-2 mb-2">{propertyType}</Badge>
        )}
      </div>
      
      <div className="space-y-6">
        {data.data.map((homestay: any) => (
          <div key={homestay.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 relative">
                <img 
                  src={homestay.images[0]} 
                  alt={homestay.name} 
                  className="w-full h-64 md:h-full object-cover"
                />
                {homestay.instantBook && (
                  <Badge className="absolute top-2 left-2 bg-green-600">Instant Book</Badge>
                )}
              </div>
              <div className="md:w-2/3 p-4">
                <div className="flex flex-col h-full">
                  <div className="mb-auto">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold">{homestay.name}</h2>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-medium">{homestay.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({homestay.reviewCount})</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{homestay.type} in {homestay.location}</p>
                    
                    <div className="flex flex-wrap mb-4">
                      <div className="mr-4 text-gray-600">
                        <span className="font-medium">{homestay.guests}</span> guests
                      </div>
                      <div className="mr-4 text-gray-600">
                        <span className="font-medium">{homestay.bedrooms}</span> bedrooms
                      </div>
                      <div className="mr-4 text-gray-600">
                        <span className="font-medium">{homestay.beds}</span> beds
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">{homestay.bathrooms}</span> bathrooms
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap">
                        {homestay.amenities.slice(0, 4).map((amenity: string, index: number) => (
                          <span key={index} className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                            {amenity}
                          </span>
                        ))}
                        {homestay.amenities.length > 4 && (
                          <span className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                            +{homestay.amenities.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 flex flex-col md:flex-row justify-between items-end">
                    <div>
                      <div className="text-2xl font-bold text-primary">₹{homestay.pricePerNight.toFixed(2)} <span className="text-gray-500 text-sm font-normal">night</span></div>
                      <div className="text-gray-500 text-sm">₹{(homestay.pricePerNight * nights).toFixed(2)} total for {nights} {nights === 1 ? 'night' : 'nights'}</div>
                    </div>
                    <Button className="bg-secondary hover:bg-secondary-dark text-white mt-3 md:mt-0">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}