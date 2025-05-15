import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, PlaneTakeoff, Gift, Headphones } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <h1 className="text-2xl font-bold text-primary heading">
              <span className="text-secondary">Travel</span>Ease
            </h1>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/trips">
            <a className={`text-neutral-400 hover:text-primary font-medium text-sm flex items-center ${location === '/trips' ? 'text-primary' : ''}`}>
              <PlaneTakeoff className="h-4 w-4 mr-2" /> My Trips
            </a>
          </Link>
          <Link href="/offers">
            <a className={`text-neutral-400 hover:text-primary font-medium text-sm flex items-center ${location === '/offers' ? 'text-primary' : ''}`}>
              <Gift className="h-4 w-4 mr-2" /> Offers
            </a>
          </Link>
          <Link href="/support">
            <a className={`text-neutral-400 hover:text-primary font-medium text-sm flex items-center ${location === '/support' ? 'text-primary' : ''}`}>
              <Headphones className="h-4 w-4 mr-2" /> Support
            </a>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/checkout">
            <Button variant="outline" className="hover:bg-secondary/20 mr-2">
              Test Checkout
            </Button>
          </Link>
          <Button variant="default" className="bg-primary hover:bg-primary/90" onClick={() => window.location.href = '/api/login'}>
            Log In
          </Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5 text-neutral-400" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-primary heading">
                  <span className="text-secondary">Travel</span>Ease
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/trips">
                  <a 
                    className={`text-neutral-400 hover:text-primary font-medium text-base flex items-center py-2 ${location === '/trips' ? 'text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PlaneTakeoff className="h-5 w-5 mr-2" /> My Trips
                  </a>
                </Link>
                <Link href="/offers">
                  <a 
                    className={`text-neutral-400 hover:text-primary font-medium text-base flex items-center py-2 ${location === '/offers' ? 'text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Gift className="h-5 w-5 mr-2" /> Offers
                  </a>
                </Link>
                <Link href="/support">
                  <a 
                    className={`text-neutral-400 hover:text-primary font-medium text-base flex items-center py-2 ${location === '/support' ? 'text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Headphones className="h-5 w-5 mr-2" /> Support
                  </a>
                </Link>
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Link href="/checkout" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full mb-3" variant="outline">
                      Test Checkout
                    </Button>
                  </Link>
                  <Button 
                    className="w-full" 
                    variant="default"
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.location.href = '/api/login';
                    }}
                  >
                    Log In
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
