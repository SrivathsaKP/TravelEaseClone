import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { fetchFlightById } from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MapPinIcon, CalendarIcon, ArrowRightIcon } from "@/lib/icons";

export default function CabSearch() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const date = params.get('date') || '';
  const time = params.get('time') || '';
  const type = params.get('type') || 'All Cabs';
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['/api/cabs/search', from, to, date, type],
    enabled: !!(from && to && date)
  });
  
  useEffect(() => {
    document.title = `Cab Search - ${from} to ${to} | TravelEase`;
  }, [from, to]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Finding Cabs from {from} to {to}</h1>
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
            Unable to fetch cab results. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (data && data.data && data.data.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <Alert className="mb-6">
          <AlertTitle>No Cabs Found</AlertTitle>
          <AlertDescription>
            Sorry, we couldn't find any cabs matching your search criteria. Try different locations or dates.
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
      <h1 className="text-2xl font-bold mb-2">Cab Results</h1>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <MapPinIcon className="h-4 w-4 mr-1" /> {from} <ArrowRightIcon className="h-4 w-4 mx-1" /> {to}
        <span className="mx-2">|</span>
        <CalendarIcon className="h-4 w-4 mr-1" /> {new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })} · {time}
        {type !== 'All Cabs' && (
          <>
            <span className="mx-2">|</span>
            {type}
          </>
        )}
      </div>
      
      <div className="space-y-4">
        {data.data.map((cab: any) => (
          <div key={cab.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <img src={cab.providerLogo} alt={cab.providerName} className="h-6 mr-2" />
                    <h3 className="text-lg font-semibold">{cab.providerName}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded ml-2">
                      {cab.vehicleType}
                    </span>
                  </div>
                  <div className="text-gray-600 flex items-center">
                    <span className="font-medium mr-2">{cab.vehicleName}</span>
                    <span className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                      {cab.maxPassengers} Passengers
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">₹{cab.price.toFixed(2)}</div>
                  <div className="text-gray-500 text-sm">{cab.estimatedTime} mins</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="space-y-1 mb-3 md:mb-0">
                    <div className="flex items-center text-gray-600">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Free cancellation up to {cab.cancellationTime} before pickup
                    </div>
                    {cab.airconditioned && (
                      <div className="flex items-center text-gray-600">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Air Conditioned
                      </div>
                    )}
                  </div>
                  <Button className="bg-secondary hover:bg-secondary-dark text-white">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}