
import { Menu, User, Package, ShoppingBag, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-primary">
          NeighBorrow
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/events" className="text-gray-600 hover:text-primary transition-colors">
                Events
              </Link>
              <Link to="/lend-borrow" className="text-gray-600 hover:text-primary transition-colors">
                Lend/Borrow
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-primary transition-colors">
                Profile
              </Link>
              <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <a href="#browse" className="text-gray-600 hover:text-primary transition-colors">
                Browse
              </a>
              <a href="#share" className="text-gray-600 hover:text-primary transition-colors">
                Share
              </a>
              <Link to="/events" className="text-gray-600 hover:text-primary transition-colors">
                Events
              </Link>
              <Link to="/signin">
                <Button variant="default">Sign In</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px]">
            <div className="flex flex-col space-y-4 mt-8">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 p-2 bg-secondary/20 rounded-md mb-4">
                    <User className="text-primary" />
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <Link to="/profile" className="flex items-center gap-3 text-lg text-gray-600 hover:text-primary transition-colors">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <Link to="/dashboard" className="flex items-center gap-3 text-lg text-gray-600 hover:text-primary transition-colors">
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/lend-borrow" className="flex items-center gap-3 text-lg text-gray-600 hover:text-primary transition-colors">
                    <span>Lend/Borrow</span>
                  </Link>
                  <Link to="/lended-items" className="flex items-center gap-3 text-lg text-gray-600 hover:text-primary transition-colors">
                    <Package className="h-5 w-5" />
                    <span>Lended Items (0)</span>
                  </Link>
                  <Link to="/borrowed-items" className="flex items-center gap-3 text-lg text-gray-600 hover:text-primary transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Borrowed Items (0)</span>
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-3 text-lg text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <a href="#browse" className="text-lg text-gray-600 hover:text-primary transition-colors">
                    Browse
                  </a>
                  <a href="#share" className="text-lg text-gray-600 hover:text-primary transition-colors">
                    Share
                  </a>
                  <Link to="/events" className="text-lg text-gray-600 hover:text-primary transition-colors">
                    Events
                  </Link>
                  <Link to="/signin" className="text-lg text-primary hover:text-primary/90 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/signup" className="text-lg text-primary hover:text-primary/90 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
