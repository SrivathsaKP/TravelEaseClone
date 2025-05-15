import { Link } from "wouter";

interface Destination {
  id: string;
  name: string;
  price: number;
  image: string;
}

const destinations: Destination[] = [
  {
    id: "agra",
    name: "Agra",
    price: 1999,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: "mumbai",
    name: "Mumbai",
    price: 2499,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: "goa",
    name: "Goa",
    price: 3299,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: "jaipur",
    name: "Jaipur",
    price: 1799,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  }
];

const FeaturedDestinations = () => {
  return (
    <div className="container mx-auto px-4 mb-12">
      <h2 className="text-2xl font-bold mb-6 heading">Featured Destinations</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <Link key={destination.id} href={`/flights?to=${destination.id}`}>
            <a className="rounded-xl overflow-hidden shadow-lg group relative cursor-pointer">
              <img 
                src={destination.image} 
                alt={`${destination.name} destination`} 
                className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-bold text-lg heading">{destination.name}</h3>
                <p className="text-sm opacity-90">Flights from ₹{destination.price}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDestinations;
