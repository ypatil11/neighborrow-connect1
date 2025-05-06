import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, MapPin, Calendar, Clock } from "lucide-react";
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

const BorrowedItems = () => {
  const { user } = useAuth();
  const [borrowedItems, setBorrowedItems] = useState<{ listing: Listing; request: BorrowRequest }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load listings from localStorage
    const storedListings = localStorage.getItem('listings');
    if (storedListings && user) {
      const allListings = JSON.parse(storedListings);
      const userBorrowedItems = allListings.reduce((acc: { listing: Listing; request: BorrowRequest }[], listing: Listing) => {
        const userRequests = listing.borrowRequests
          .filter(request => request.userId === user.id)
          .map(request => ({ listing, request }));
        return [...acc, ...userRequests];
      }, []);
      setBorrowedItems(userBorrowedItems);
    }
    setIsLoading(false);
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-white">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Borrowed Items</h1>

        {borrowedItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Borrowed Items</h3>
              <p className="text-gray-500 mb-4">You haven't borrowed any items yet.</p>
              <Button onClick={() => window.location.href = '/borrow'}>
                Browse Available Items
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {borrowedItems.map(({ listing, request }) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{listing.title}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">{listing.description}</p>
                    </div>
                    <Badge variant={request.status === 'pending' ? 'secondary' : request.status === 'accepted' ? 'default' : 'destructive'}>
                      {request.status}
                    </Badge>
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
                        <span className="text-gray-500">Requested From:</span>
                        <p className="font-medium">{formatDate(request.requestedDates.startDate)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Requested Until:</span>
                        <p className="font-medium">{formatDate(request.requestedDates.endDate)}</p>
                      </div>
                    </div>

                    {/* Owner Information */}
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>Owner: {listing.ownerName} ({listing.ownerLocation})</span>
                      </div>
                    </div>

                    {/* Status-specific Information */}
                    {request.status === 'accepted' && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Request Accepted!</h4>
                        <p className="text-sm text-green-700">
                          You can pick up the item from {listing.ownerName} at their location in {listing.ownerLocation}.
                          Please coordinate the pickup time with them.
                        </p>
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

export default BorrowedItems; 