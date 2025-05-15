import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import MaterialThemeProvider from "./lib/MaterialThemeProvider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import FlightSearch from "@/pages/FlightSearch";
import HotelSearch from "@/pages/HotelSearch";
import TrainSearch from "@/pages/TrainSearch";
import BusSearch from "@/pages/BusSearch";
import CabSearch from "@/pages/CabSearch";
import HomeStaySearch from "@/pages/HomeStaySearch";
import InsuranceSearch from "@/pages/InsuranceSearch";
import Checkout from "@/pages/Checkout";
import BookingSuccess from "@/pages/BookingSuccess";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TabNavigation from "@/components/TabNavigation";

// Import new Material UI search pages
import FlightSearchPage from "@/pages/FlightSearchPage";
import HotelSearchPage from "@/pages/HotelSearchPage";
import BusSearchPage from "@/pages/BusSearchPage";
import TrainSearchPage from "@/pages/TrainSearchPage";
import HomeStaySearchPage from "@/pages/HomeStaySearchPage";
import HolidayPackagePage from "@/pages/HolidayPackagePage";

// Import Redux store provider
import { Provider } from "react-redux";
import { store } from "@/store";

function Router() {
  const [location] = useLocation();
  const isHomePage = location === '/';
  
  // Show Header on all pages, but TabNavigation only on non-home pages
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {!isHomePage && <TabNavigation />}
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home}/>
          {/* Legacy pages */}
          <Route path="/flight-search" component={FlightSearch}/>
          <Route path="/hotel-search" component={HotelSearch}/>
          <Route path="/homestay-search" component={HomeStaySearch}/>
          <Route path="/train-search" component={TrainSearch}/>
          <Route path="/bus-search" component={BusSearch}/>
          <Route path="/cab-search" component={CabSearch}/>
          <Route path="/insurance-search" component={InsuranceSearch}/>
          
          {/* New Material UI search pages */}
          <Route path="/flights" component={FlightSearchPage}/>
          <Route path="/flights/search" component={FlightSearchPage}/>
          <Route path="/hotels" component={HotelSearchPage}/>
          <Route path="/hotels/search" component={HotelSearchPage}/>
          <Route path="/buses" component={BusSearchPage}/>
          <Route path="/buses/search" component={BusSearchPage}/>
          <Route path="/trains" component={TrainSearchPage}/>
          <Route path="/trains/search" component={TrainSearchPage}/>
          <Route path="/homestays" component={HomeStaySearchPage}/>
          <Route path="/homestays/search" component={HomeStaySearchPage}/>
          <Route path="/holiday-packages" component={HolidayPackagePage}/>
          <Route path="/holiday-packages/search" component={HolidayPackagePage}/>
          
          {/* Checkout & confirmation */}
          <Route path="/checkout" component={Checkout}/>
          <Route path="/booking-success" component={BookingSuccess}/>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <MaterialThemeProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </MaterialThemeProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
