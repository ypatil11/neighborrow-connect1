
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const popularSearches = [
  "iPad rental in Boulder",
  "Headphones rental in Boulder",
  "Acoustic Guitar rental in Boulder",
  "Piano rental in Boulder", 
  "Microphone rental in Boulder",
  "Microwave rental in Boulder",
  "Iron rental in Boulder"
];

const PopularListings = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular products in Boulder</h2>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ul className="space-y-4">
            {popularSearches.map((search, index) => (
              <li key={index} className="flex items-center">
                <Search className="text-gray-400 mr-3 h-4 w-4 flex-shrink-0" />
                <a 
                  href="#" 
                  className="text-gray-800 hover:text-primary transition-colors"
                >
                  {search}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 text-center">
            <Button 
              variant="link" 
              className="text-primary font-medium inline-flex items-center"
            >
              More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularListings;
