import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, MapPin, Navigation, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isChangingLocation, setIsChangingLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

  // Load user's location from localStorage on component mount
  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      const location = JSON.parse(storedLocation);
      setLocation(location.display_name || location.address || 'Location not set');
    }
  }, []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your current password",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New password must be at least 8 characters",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New passwords do not match",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to change password
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      });
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);
      setIsLoading(false);
    }, 1000);
  };

  const detectLocation = () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Geolocation is not supported by your browser",
      });
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // In a real app, we would use the Google Maps API to get the address
          // For this example, we'll just set a placeholder
          const newLocation = "Detected location";
          setLocation(newLocation);
          localStorage.setItem('userLocation', JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            display_name: newLocation
          }));
          toast({
            title: "Location updated",
            description: "Your location has been updated successfully",
          });
          setIsChangingLocation(false);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to detect location",
          });
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to detect location",
        });
        setIsLoadingLocation(false);
      }
    );
  };

  const handleLocationChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your new location",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to change location
    setTimeout(() => {
      localStorage.setItem('userLocation', JSON.stringify({
        display_name: location
      }));
      toast({
        title: "Location updated",
        description: "Your location has been changed successfully",
      });
      
      setIsChangingLocation(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-500 text-sm">Name</Label>
                <p className="font-medium">{user?.name || 'Not available'}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-sm">Email</Label>
                <p className="font-medium">{user?.email || 'Not available'}</p>
              </div>
              
              <div className="pt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                >
                  Change Password
                </Button>
                
                {isChangingPassword && (
                  <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input 
                        id="new-password" 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Save New Password"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/10 p-4 rounded-lg">
                <Label className="text-gray-500 text-sm">Current Location</Label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="font-medium">{location || 'Not set'}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsChangingLocation(!isChangingLocation)}
              >
                Change Location
              </Button>
              
              {isChangingLocation && (
                <div className="mt-4 space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={detectLocation}
                    disabled={isLoadingLocation}
                  >
                    {isLoadingLocation ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Detecting Location...
                      </>
                    ) : (
                      <>
                        <Navigation className="mr-2 h-4 w-4" />
                        Auto-detect Location
                      </>
                    )}
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or</span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleLocationChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Enter Location Manually</Label>
                      <Input 
                        id="location" 
                        type="text"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Save Location"
                      )}
                    </Button>
                  </form>
                </div>
              )}

              <div className="pt-4">
                <Link to="/lended-items">
                  <Button className="w-full">
                    <Package className="mr-2 h-4 w-4" />
                    View Lended Items
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
