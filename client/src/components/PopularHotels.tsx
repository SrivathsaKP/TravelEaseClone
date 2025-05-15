import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
}

const hotels: Hotel[] = [
  {
    id: "luxury-palace",
    name: "Luxury Palace Hotel",
    location: "Jaipur, Rajasthan",
    price: 5900,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    amenities: ["Swimming Pool", "Spa", "Free WiFi", "Restaurant"]
  },
  {
    id: "boutique-inn",
    name: "Boutique Inn",
    location: "Mumbai, Maharashtra",
    price: 3200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    amenities: ["Gym", "Free WiFi", "Room Service"]
  },
  {
    id: "budget-inn",
    name: "Budget Inn Express",
    location: "Delhi, Delhi",
    price: 2360,
    rating: 3.5,
    image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    amenities: ["Parking", "Free WiFi", "Restaurant"]
  }
];

const PopularHotels = () => {
  return (
    <div className="container mx-auto px-4 mb-12">
      <h2 className="text-2xl font-bold mb-6 heading">Popular Hotels</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div className="bg-white rounded-xl overflow-hidden shadow-lg" key={hotel.id}>
            <div className="relative">
              <img 
                src={hotel.image} 
                alt={`${hotel.name} room`} 
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
                {hotel.rating} <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg heading">{hotel.name}</h3>
                <div className="text-lg font-bold text-primary">₹{hotel.price}</div>
              </div>
              <div className="flex items-center text-sm text-neutral-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {hotel.location}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {hotel.amenities.map((amenity, index) => (
                  <span key={index} className="bg-neutral-100 text-neutral-400 rounded-full px-2 py-1 text-xs">{amenity}</span>
                ))}
              </div>
              <Link href={`/hotels/${hotel.id}`}>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white py-2 rounded-lg text-sm font-medium transition">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularHotels;
