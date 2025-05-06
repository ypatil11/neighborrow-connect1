import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Clock, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  distance: number;
}

interface LocationSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const mockEvents: Event[] = [
    {
      id: 1,
      title: "Community Gardening Workshop",
      description: "Learn organic gardening techniques from local experts",
      date: "2024-03-15",
      time: "10:00 AM",
      location: "Community Garden Center",
      distance: 0,
    },
    {
      id: 2,
      title: "Tool Sharing Meetup",
      description: "Connect with neighbors and share tools",
      date: "2024-03-20",
      time: "2:00 PM",
      location: "Local Park",
      distance: 0,
    },
    {
      id: 3,
      title: "DIY Home Repair Workshop",
      description: "Basic home repair skills workshop",
      date: "2024-03-25",
      time: "3:30 PM",
      location: "Community Center",
      distance: 0,
    },
  ];

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const updateEventsWithDistance = (latitude: number, longitude: number) => {
    const eventLocations = [
      { lat: latitude + 0.01, lng: longitude + 0.01 },
      { lat: latitude + 0.02, lng: longitude - 0.01 },
      { lat: latitude - 0.01, lng: longitude + 0.02 },
    ];

    const eventsWithDistance = mockEvents.map((event, index) => ({
      ...event,
      distance: calculateDistance(
        latitude,
        longitude,
        eventLocations[index].lat,
        eventLocations[index].lng
      ),
    }));

    const sortedEvents = eventsWithDistance.sort((a, b) => a.distance - b.distance);
    setEvents(sortedEvents);
  };

  const searchLocations = async (query: string) => {
    if (query.length < 3) {
      setLocationSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5`
      );
      const data = await response.json();
      setLocationSuggestions(data);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch location suggestions",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationSelect = (suggestion: LocationSuggestion) => {
    const location = {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
    };
    setUserLocation(location);
    localStorage.setItem('userLocation', JSON.stringify(location));
    updateEventsWithDistance(location.lat, location.lng);
    setLocationSearch(suggestion.display_name);
    setLocationSuggestions([]);
    setShowLocationDialog(false);
  };

  const handleLocationSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationSearch(value);
    searchLocations(value);
  };

  const handleLocationRequest = () => {
    const storedLocation = localStorage.getItem('userLocation');

    if (storedLocation) {
      const location = JSON.parse(storedLocation);
      setUserLocation(location);
      updateEventsWithDistance(location.lat, location.lng);
    } else {
      setShowLocationDialog(true);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Geolocation is not supported by your browser",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        localStorage.setItem('userLocation', JSON.stringify(location));
        updateEventsWithDistance(location.lat, location.lng);
        setShowLocationDialog(false);
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to get location",
        });
      }
    );
  };

  useEffect(() => {
    handleLocationRequest();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Change Location Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Nearby Events</h1>
          <Button onClick={() => setShowLocationDialog(true)}>
            Change Location
          </Button>
        </div>

        {/* Events List */}
        <div className="grid gap-6">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="text-muted-foreground mt-2">
                    {event.distance.toFixed(1)} km away
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Location Dialog */}
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Location Access</DialogTitle>
            <DialogDescription>
              Choose how you want to provide your location
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button onClick={getLocation} className="w-full">
              Auto-detect My Location
            </Button>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Enter your location</Label>
                <div className="relative">
                  <Input
                    id="location"
                    type="text"
                    placeholder="Search for city, area, or country"
                    value={locationSearch}
                    onChange={handleLocationSearch}
                  />
                  {locationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                      {locationSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          onClick={() => handleLocationSelect(suggestion)}
                        >
                          {suggestion.display_name}
                        </button>
                      ))}
                    </div>
                  )}
                  {isSearching && (
                    <div className="absolute right-3 top-3 text-sm text-muted-foreground">
                      Searching...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;