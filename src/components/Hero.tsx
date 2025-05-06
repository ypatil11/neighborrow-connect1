import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary/30 to-white pt-16">
      <div className="container mx-auto px-4 py-16 text-center">
        <span className="inline-block animate-fade-in bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
          Join Neighborhood
        </span>
        <h1 className="animate-fade-in text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Share Resources,
          <br /> Build Connections
        </h1>
        <p className="animate-fade-in text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with your neighbors to share items, skills, and create a stronger community. Join NeighBorrow today.
        </p>
        <div className="animate-fade-in flex flex-col sm:flex-row gap-4 justify-center">
          {/* Updated "Get Started" Button */}
          <Link to="/signup">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;