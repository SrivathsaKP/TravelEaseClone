import HeroBanner from "@/components/HeroBanner";
import SearchTabs from "@/components/SearchTabs";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import PopularHotels from "@/components/PopularHotels";
import DownloadApp from "@/components/DownloadApp";
import { Helmet } from 'react-helmet';

const Home = () => {
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
      <SearchTabs />
      <FeaturedDestinations />
      <PopularHotels />
      <DownloadApp />
    </>
  );
};

export default Home;
