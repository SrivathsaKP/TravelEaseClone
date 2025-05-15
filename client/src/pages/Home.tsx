import { useState } from 'react';
import HeroBanner from "@/components/HeroBanner";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import PopularHotels from "@/components/PopularHotels";
import DownloadApp from "@/components/DownloadApp";
import { Helmet } from 'react-helmet';
import MaterialSearchTabs from "../components/MaterialSearchTabs.jsx";
import { Box, Typography, Container } from '@mui/material';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  const renderConditionalContent = () => {
    switch (selectedTab) {
      case 0: // Flights
        return (
          <>
            <FeaturedDestinations />
            <Box sx={{ py: 4, backgroundColor: '#f5f5f5' }}>
              <Container>
                <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Why Book Flights with TravelEase?
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Enjoy hassle-free flight bookings with superior benefits:
                </Typography>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>Zero cancellation fee for 24 hours after booking</li>
                  <li>Instant refunds and easy rebooking options</li>
                  <li>Special discounts for students, seniors and armed forces</li>
                  <li>Exclusive flight deals and lowest airfare guaranteed</li>
                </ul>
              </Container>
            </Box>
          </>
        );
      case 1: // Hotels
        return (
          <>
            <PopularHotels />
            <Box sx={{ py: 4, backgroundColor: '#f5f5f5' }}>
              <Container>
                <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Top Hotel Chains
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Book your stay with our trusted premium partners:
                </Typography>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>Marriott - Experience luxury and world-class service</li>
                  <li>Hilton - Enjoy comfort with a global standard</li>
                  <li>Taj Hotels - Discover iconic Indian hospitality</li>
                  <li>Hyatt - Premium accommodations for business and leisure</li>
                </ul>
              </Container>
            </Box>
          </>
        );
      case 2: // Homestays
        return (
          <Box sx={{ py: 4, backgroundColor: '#f5f5f5' }}>
            <Container>
              <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                Comfortable Homestays
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Experience local life with our curated homestay options:
              </Typography>
              <ul style={{ paddingLeft: '20px' }}>
                <li>Villas and apartments with private pools</li>
                <li>Heritage homes with authentic local experiences</li>
                <li>Farm stays for a refreshing countryside break</li>
                <li>Mountain retreats with spectacular views</li>
              </ul>
            </Container>
          </Box>
        );
      case 3: // Trains
      case 4: // Buses
      case 5: // Cabs
      case 6: // Insurance
      default:
        return <DownloadApp />;
    }
  };

  return (
    <>
      <Helmet>
        <title>TravelEase - Your One-Stop Travel Solution</title>
        <meta name="description" content="Book flights, hotels, trains & buses at the best prices. TravelEase is your one-stop solution for all travel needs." />
        <meta property="og:title" content="TravelEase - Your One-Stop Travel Solution" />
        <meta property="og:description" content="Book flights, hotels, trains & buses at the best prices. TravelEase is your one-stop solution for all travel needs." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <HeroBanner />
      <MaterialSearchTabs onTabChange={handleTabChange} />
      
      {renderConditionalContent()}
      
      <DownloadApp />
    </>
  );
};

export default Home;
