import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, MapPin, Calendar, Clock, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  image: string;
  ownerId: string;
  ownerName: string;
  ownerLocation: string;
  availability: {
    startDate: string;
    endDate: string;
  };
  price?: number;
  borrowRequests: any[];
}

const Borrow = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setListings([]);
      return;
    }
    const storedListings = localStorage.getItem('listings');
    const allListings = storedListings ? JSON.parse(storedListings) : [];
    // Show all items NOT owned by the current user
    const availableListings = allListings.filter(
      (listing) => listing.ownerId !== user.id
      // Optionally add location filter here:
      // && listing.ownerLocation?.toLowerCase() === user.location?.toLowerCase()
    );
    setListings(availableListings);
    setIsLoading(false);
  }, [user]);

  const handleBorrowRequest = (listingId: string) => {
    // Get the listing
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return;

    // Create a new borrow request
    const newRequest = {
      id: Date.now().toString(),
      userId: user?.id,
      userName: user?.name,
      userLocation: "Amsterdam", // In a real app, this would come from user's profile
      status: "pending" as const,
      requestedDates: {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
      },
      createdAt: new Date().toISOString(),
    };

    // Get existing listings
    const storedListings = localStorage.getItem('listings');
    if (storedListings) {
      const allListings = JSON.parse(storedListings);
      const updatedListings = allListings.map((l: Listing & { borrowRequests: any[] }) => {
        if (l.id === listingId) {
          return {
            ...l,
            borrowRequests: [...(l.borrowRequests || []), newRequest],
          };
        }
        return l;
      });

      // Update localStorage
      localStorage.setItem('listings', JSON.stringify(updatedListings));

      toast({
        title: "Borrow Request Sent",
        description: "Your request has been sent to the owner.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  console.log("Current user:", user);
  console.log("Listings in localStorage:", JSON.parse(localStorage.getItem('listings')));
  console.log("Listings to show:", listings);

  if (!user) return <div className="text-center py-12">Please sign in to view available items.</div>;
  if (isLoading) return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="flex items-center mb-8">
          <Link to="/lend-borrow" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Available Items in {user.location}</h1>
        </div>

        {listings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Items Available</h3>
              <p className="text-gray-500 mb-4">There are no items available for borrowing in your area at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {listings.map((listing) => (
              <Card key={listing.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{listing.title}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">{listing.description}</p>
                    </div>
                    <Badge variant="outline">{listing.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {/* Item Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Condition:</span>
                        <p className="font-medium">{listing.condition}</p>
                      </div>
                      {listing.price && (
                        <div>
                          <span className="text-gray-500">Price:</span>
                          <p className="font-medium">${listing.price}/day</p>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">Available From:</span>
                        <p className="font-medium">{formatDate(listing.availability.startDate)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Available Until:</span>
                        <p className="font-medium">{formatDate(listing.availability.endDate)}</p>
                      </div>
                    </div>

                    {/* Owner Information */}
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>Owner: {listing.ownerName} ({listing.ownerLocation})</span>
                      </div>
                    </div>

                    {/* Borrow Button */}
                    <Button 
                      onClick={() => handleBorrowRequest(listing.id)}
                      className="w-full"
                    >
                      Request to Borrow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Borrow;
