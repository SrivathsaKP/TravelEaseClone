import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function InsuranceSearch() {
  const [locationPath] = useLocation();
  const params = new URLSearchParams(locationPath.split('?')[1] || '');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const travelType = params.get('type') || 'domestic';
  const travelers = params.get('travelers') || '';
  const startDate = params.get('startDate') || '';
  const duration = params.get('duration') || '';
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['/api/insurance-plans/search', travelType, duration],
    enabled: !!(travelType && duration)
  });
  
  useEffect(() => {
    document.title = `Travel Insurance - ${travelType === 'international' ? 'International' : 'Domestic'} | TravelEase`;
  }, [travelType]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Finding {travelType === 'international' ? 'International' : 'Domestic'} Travel Insurance Plans</h1>
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
            Unable to fetch insurance plans. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (data && data.data && data.data.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <Alert className="mb-6">
          <AlertTitle>No Insurance Plans Found</AlertTitle>
          <AlertDescription>
            Sorry, we couldn't find any insurance plans matching your search criteria. Try different options.
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
      <h1 className="text-2xl font-bold mb-2">Travel Insurance Plans</h1>
      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
        <div className="flex items-center mr-4 mb-2">
          <Badge variant={travelType === 'domestic' ? 'secondary' : 'outline'} className="mr-2">
            {travelType === 'domestic' ? 'Domestic' : 'International'}
          </Badge>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <CalendarIcon className="h-4 w-4 mr-1" /> 
          Travel Start: {new Date(startDate).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
        </div>
        <div className="mr-4 mb-2">Duration: {duration}</div>
        <div className="mb-2">Travelers: {travelers}</div>
      </div>
      
      <div className="space-y-6">
        {data.data.map((plan: any) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <img src={plan.providerLogo} alt={plan.providerName} className="h-8 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold">{plan.planName}</h3>
                      <p className="text-sm text-gray-600">{plan.providerName}</p>
                    </div>
                  </div>
                  
                  {plan.recommended && (
                    <Badge className="bg-green-600 mb-2">Recommended</Badge>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">₹{plan.premiumAmount.toFixed(2)}</div>
                  <div className="text-gray-500 text-sm">Coverage: ₹{plan.coverageAmount.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium mb-1">Medical Coverage</h4>
                  <div className="text-sm">{plan.medicalCoverage}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium mb-1">Trip Cancellation</h4>
                  <div className="text-sm">{plan.tripCancellation}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium mb-1">Baggage Loss</h4>
                  <div className="text-sm">{plan.baggageLoss}</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mb-3 md:mb-0 w-full md:w-auto">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{plan.planName} - Coverage Details</DialogTitle>
                        <DialogDescription>
                          By {plan.providerName}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h3 className="font-semibold mb-2">Coverage Highlights</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {plan.coverageHighlights.map((item: string, index: number) => (
                              <li key={index} className="text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Coverage Limits</h3>
                          <div className="space-y-3">
                            {plan.coverageLimits.map((item: {type: string, limit: string}, index: number) => (
                              <div key={index} className="flex justify-between">
                                <span className="text-sm">{item.type}</span>
                                <span className="text-sm font-medium">{item.limit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Important Exclusions</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {plan.exclusions.map((item: string, index: number) => (
                            <li key={index} className="text-sm text-gray-600">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button className="bg-secondary hover:bg-secondary-dark text-white w-full md:w-auto">
                    Buy Now
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