import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useSearchParams } from "@/lib/utils";
import { fetchFlightSearchResults } from "@/lib/api";
import { Flight } from "@/lib/types";
import SearchTabs from "@/components/SearchTabs";
import FlightResults from "@/components/FlightResults";
import { Helmet } from 'react-helmet';

const FlightSearch = () => {
  const [location] = useLocation();
  const params = useSearchParams(location);
  
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const date = params.get("date") || new Date().toISOString().split('T')[0];
  
  const { data, isLoading, error } = useQuery<{data: Flight[]}>({
    queryKey: ['/api/flights/search', from, to, date],
    enabled: !!from && !!to && !!date
  });
  
  const flights = data?.data || [];

  return (
    <>
      <Helmet>
        <title>Flight Search: {from} to {to} | TravelEase</title>
        <meta name="description" content={`Find the best flight deals from ${from} to ${to}. Compare prices, timings, and book your tickets with TravelEase.`} />
        <meta property="og:title" content={`Flight Search: ${from} to ${to} | TravelEase`} />
        <meta property="og:description" content={`Find the best flight deals from ${from} to ${to}. Compare prices, timings, and book your tickets with TravelEase.`} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="bg-primary h-24 md:h-32"></div>
      <SearchTabs />
      
      <FlightResults 
        flights={flights} 
        loading={isLoading} 
        sourceCity={from}
        destinationCity={to}
      />
    </>
  );
};

export default FlightSearch;
