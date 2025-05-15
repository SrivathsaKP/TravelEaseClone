import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <div className="relative h-64 md:h-96 bg-cover bg-center" 
         style={{ backgroundImage: `url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=600')` }}>
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-400/70 to-primary/40"></div>
      <div className="absolute inset-0 flex items-center px-4 md:px-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white heading mb-4">Discover Your Perfect Journey</h1>
          <p className="text-white text-lg md:text-xl mb-6">Book flights, hotels, trains & buses all in one place</p>
          <Button className="bg-secondary hover:bg-secondary/90 text-white py-3 px-6 rounded-lg font-medium transition">
            Explore Deals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
