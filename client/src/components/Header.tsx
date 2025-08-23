import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon, PlaneTakeoff, Gift, Headphones, User, LogOut, Settings, Bell } from "lucide-react";
import { User as UserType } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [, setLocationPath] = useLocation();
  const { toast } = useToast();
  
  // Mock notification data
  const notifications = [
    { id: 1, message: "Your flight to Mumbai is confirmed", time: "2 min ago", unread: true },
    { id: 2, message: "New offer: 20% off on hotels", time: "1 hour ago", unread: true },
    { id: 3, message: "Payment successful for train booking", time: "3 hours ago", unread: false },
  ];
  
  const unreadCount = notifications.filter(n => n.unread).length;

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

    // Listen for custom login event
    const handleLoginEvent = () => {
      loadUser();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleLoginEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleLoginEvent);
    };
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

  const handleLogin = (userData: UserType) => {
    setUser(userData);
    // Dispatch custom event for immediate UI update
    window.dispatchEvent(new CustomEvent('userLogin'));
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg group-hover:shadow-lg transition-all duration-200">
              <PlaneTakeoff className="h-6 w-6 text-white" />
            </div>
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
          {/* <Link href="/checkout">
            <Button variant="outline" className="hover:bg-secondary/20 mr-2">
              Test Checkout
            </Button>
          </Link> */}
          
          {user ? (
            <>
              {/* Notification Bell */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative bg-primary/10 hover:bg-primary/20 transition-colors h-10 w-10 flex items-center justify-center rounded-full" style={{ marginTop: '2px' }}>
                    <Bell className="h-5 w-5 text-primary hover:text-primary transition-colors" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  side="bottom"
                  sideOffset={8}
                  className="w-80 bg-white border border-border rounded-xl shadow-2xl p-2 z-[9999]"
                >
                  <div className="p-3 border-b border-border">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <p className="text-xs text-muted-foreground">You have {unreadCount} unread notifications</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <DropdownMenuItem 
                        key={notification.id}
                        className={`flex flex-col items-start gap-1 p-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer !text-primary [&:hover]:!text-primary [&:hover]:!bg-primary/10 ${
                          notification.unread ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between w-full">
                          <p className={`text-sm !text-primary [&:hover]:!text-primary ${notification.unread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                            {notification.message}
                          </p>
                          {notification.unread && (
                            <div className="h-2 w-2 rounded-full bg-primary ml-2 flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground [&:hover]:!text-primary">{notification.time}</p>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <div className="p-2 border-t border-border">
                    <Button variant="ghost" className="w-full text-primary hover:bg-primary/5 !text-primary [&:hover]:!text-primary [&:hover]:!bg-primary/10">
                      View All Notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 p-2 rounded-full hover:bg-primary/5 transition-all duration-200 group h-10">
                    <div className="relative">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                        {(user.firstName || user.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-primary rounded-full border-2 border-white"></div>
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {user.firstName || user.name || 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  side="top"
                  sideOffset={8}
                  className="w-64 bg-white border border-border rounded-xl shadow-2xl p-2 z-[9999]"
                >
                  <DropdownMenuItem disabled className="cursor-default hover:bg-transparent">
                    <div className="flex flex-col space-y-1 w-full p-2">
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer !text-primary [&:hover]:!text-primary [&:hover]:!bg-primary/10">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="h-4 w-4 text-primary !text-primary [&:hover]:!text-primary" />
                    </div>
                    <span className="font-medium !text-primary [&:hover]:!text-primary">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer !text-primary [&:hover]:!text-primary [&:hover]:!bg-primary/10">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <PlaneTakeoff className="h-4 w-4 text-primary !text-primary [&:hover]:!text-primary" />
                    </div>
                    <span className="font-medium !text-primary [&:hover]:!text-primary">My Trips</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer !text-primary [&:hover]:!text-primary [&:hover]:!bg-primary/10">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Settings className="h-4 w-4 text-primary !text-primary [&:hover]:!text-primary" />
                    </div>
                    <span className="font-medium !text-primary [&:hover]:!text-primary">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer !text-primary [&:hover]:!text-primary [&:hover]:!bg-primary/10"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <LogOut className="h-4 w-4 text-primary !text-primary [&:hover]:!text-primary" />
                    </div>
                    <span className="font-medium !text-primary [&:hover]:!text-primary">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline" className="bg-primary text-primary-foreground border-primary hover:bg-primary/90">
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
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                      <PlaneTakeoff className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-secondary">Travel</span>Ease
                  </div>
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
