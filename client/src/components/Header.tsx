import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon, PlaneTakeoff, Gift, Headphones, User, LogOut, Settings } from "lucide-react";
import { User as UserType } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [, setLocationPath] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData.isLoggedIn) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };

    loadUser();

    // Listen for storage changes (for cross-tab login/logout)
    const handleStorageChange = () => {
      loadUser();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    setLocationPath('/');
  };

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
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {user.firstName || user.name || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem disabled>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PlaneTakeoff className="mr-2 h-4 w-4" />
                  <span>My Trips</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline" className="hover:bg-secondary/20">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="default" className="bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
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
                  
                  {user ? (
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full" variant="outline">
                          Log In
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full" variant="default">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
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
