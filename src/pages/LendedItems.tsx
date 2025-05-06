import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, MapPin, Calendar, Clock, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

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
  borrowRequests: BorrowRequest[];
}

interface BorrowRequest {
  id: string;
  userId: string;
  userName: string;
  userLocation: string;
  status: 'pending' | 'accepted' | 'declined';
  requestedDates: {
    startDate: string;
    endDate: string;
  };
  createdAt: string;
}

const LendedItems = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  console.log("Current user:", user);
  console.log("Listings in localStorage:", JSON.parse(localStorage.getItem('listings')));
  console.log("Listings to show:", listings);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setListings([]);
      return;
    }
    const storedListings = localStorage.getItem('listings');
    if (storedListings) {
      const allListings = JSON.parse(storedListings);
      const userListings = allListings.filter(
        (listing) => listing.ownerId === user.id
      );
      setListings(userListings);
    }
    setIsLoading(false);
  }, [user]);

  const handleBorrowRequest = (listingId: string, requestId: string, action: 'accept' | 'decline') => {
    // Update local state
    setListings(prevListings => {
      return prevListings.map(listing => {
        if (listing.id === listingId) {
          const updatedRequests = listing.borrowRequests.map(request => {
            if (request.id === requestId) {
              return { ...request, status: action === 'accept' ? 'accepted' : 'declined' } as BorrowRequest;
            }
            return request;
          });
          return { ...listing, borrowRequests: updatedRequests };
        }
        return listing;
      });
    });

    // Update localStorage
    const storedListings = localStorage.getItem('listings');
    if (storedListings) {
      const allListings = JSON.parse(storedListings);
      const updatedListings = allListings.map((listing: Listing) => {
        if (listing.id === listingId) {
          const updatedRequests = listing.borrowRequests.map(request => {
            if (request.id === requestId) {
              return { ...request, status: action === 'accept' ? 'accepted' : 'declined' } as BorrowRequest;
            }
            return request;
          });
          return { ...listing, borrowRequests: updatedRequests };
        }
        return listing;
      });
      localStorage.setItem('listings', JSON.stringify(updatedListings));

      // Notify the borrower about the status change
      const request = allListings
        .find((l: Listing) => l.id === listingId)
        ?.borrowRequests.find(r => r.id === requestId);

      if (request) {
        const borrowerNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        borrowerNotifications.push({
          id: Date.now().toString(),
          userId: request.userId,
          type: 'borrow_request_update',
          message: `Your borrow request for "${allListings.find((l: Listing) => l.id === listingId)?.title}" has been ${action}ed`,
          createdAt: new Date().toISOString(),
          read: false
        });
        localStorage.setItem('notifications', JSON.stringify(borrowerNotifications));
      }
    }

    toast({
      title: action === 'accept' ? 'Request Accepted' : 'Request Declined',
      description: `You have ${action}ed the borrow request.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleListNewItem = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to list items.",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    navigate('/lend');
  };

  if (!user) return <div>No user found. Please sign in.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (listings.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-white">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Items Listed</h3>
              <p className="text-gray-500 mb-4">You haven't listed any items for lending yet.</p>
              <Button onClick={handleListNewItem}>
                List Your First Item
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Lended Items</h1>
          <Button onClick={handleListNewItem}>
            <Package className="mr-2 h-4 w-4" />
            List New Item
          </Button>
        </div>

        {listings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Items Listed</h3>
              <p className="text-gray-500 mb-4">You haven't listed any items for lending yet.</p>
              <Button onClick={handleListNewItem}>
                List Your First Item
              </Button>
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

                    {/* Borrow Requests */}
                    {listing.borrowRequests && listing.borrowRequests.length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-4">Borrow Requests</h4>
                        <div className="space-y-4">
                          {listing.borrowRequests.map((request) => (
                            <div key={request.id} className="bg-secondary/10 p-4 rounded-lg">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <h5 className="font-medium">{request.userName}</h5>
                                    <Badge variant={request.status === 'pending' ? 'secondary' : request.status === 'accepted' ? 'default' : 'destructive'}>
                                      {request.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{request.userLocation}</span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>{formatDate(request.requestedDates.startDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{formatDate(request.requestedDates.endDate)}</span>
                                    </div>
                                  </div>
                                </div>
                                {request.status === 'pending' && (
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-green-600 hover:text-green-700"
                                      onClick={() => handleBorrowRequest(listing.id, request.id, 'accept')}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600 hover:text-red-700"
                                      onClick={() => handleBorrowRequest(listing.id, request.id, 'decline')}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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

export default LendedItems; 