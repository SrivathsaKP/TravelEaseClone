import { Switch, Route } from "wouter";
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

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/flights" component={FlightSearch}/>
          <Route path="/hotels" component={HotelSearch}/>
          <Route path="/homestays" component={HomeStaySearch}/>
          <Route path="/trains" component={TrainSearch}/>
          <Route path="/buses" component={BusSearch}/>
          <Route path="/cabs" component={CabSearch}/>
          <Route path="/insurance" component={InsuranceSearch}/>
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
      <ThemeProvider attribute="class">
        <MaterialThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </MaterialThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
