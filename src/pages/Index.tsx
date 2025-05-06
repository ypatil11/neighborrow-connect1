import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import PopularListings from "@/components/PopularListings";
import Testimonials from "@/components/Testimonials";
import ValueProposition from "@/components/ValueProposition";
import FrequentlyShared from "@/components/FrequentlyShared";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("Index component mounted");
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  try {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        
        {/* CTA Section after Hero */}
        <div className="bg-secondary/30 py-8 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join our community of neighbors helping neighbors
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Sign up today to start borrowing items you need or lending items you barely use.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/signin">
                    <Button variant="outline" size="lg">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        <ProductCategories />
        <PopularListings />
        <Testimonials />
        <ValueProposition />
        <FrequentlyShared />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error in Index component:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p>We're sorry, but there was an error loading the page.</p>
        </div>
      </div>
    );
  }
};

export default Index;
