
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

// Mock events data
const mockEvents = [
  {
    id: 1,
    name: "Community Garage Sale",
    date: "2025-05-15T10:00:00",
    location: "Central Park, Boulder",
    description: "Join the community for a day of buying, selling, and trading items."
  },
  {
    id: 2,
    name: "Neighborhood Tool Exchange",
    date: "2025-05-22T14:00:00",
    location: "Community Center, Boulder",
    description: "Bring tools you rarely use and exchange them with neighbors."
  },
  {
    id: 3,
    name: "Sustainability Workshop",
    date: "2025-06-01T16:30:00",
    location: "Public Library, Boulder",
    description: "Learn about sustainable practices and how sharing resources can benefit the environment."
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<typeof mockEvents>([]);

  useEffect(() => {
    // In a real app, we would fetch events from an API
    // For this example, we'll use the mock data
    setEvents(mockEvents);
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-white">
      <Navbar />
      
      {/* Added sufficient padding to ensure content is below the fixed navbar */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name || 'Neighbor'}!
          </h1>
          
          <Link to="/lend-borrow">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Lend or Borrow Items
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Community Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-xl">{event.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-600">{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    More Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
