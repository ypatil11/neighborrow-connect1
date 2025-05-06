import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Headphones, ShoppingBag, Home, PartyPopper, Music, Monitor, Smartphone, Dog, Shirt, Utensils, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

const mainCategories = [
  { id: 1, name: "Sound & Video", icon: <Headphones className="h-6 w-6" />, subcategories: [
    "Photography", "Photography Accessories", "Camcorders", "Other Audio & Video",
    "Music players", "Musical instruments", "Televisions", "Projectors & Accessories",
    "Music Accessories", "Audio equipment"
  ]},
  { id: 2, name: "Gaming", icon: <Smartphone className="h-6 w-6" /> },
  { id: 3, name: "Pets", icon: <Dog className="h-6 w-6" /> },
  { id: 4, name: "Tools", icon: <Utensils className="h-6 w-6" /> }, // Changed Tool to Utensils
  { id: 5, name: "Health & Baby", icon: <ShoppingBag className="h-6 w-6" /> },
  { id: 6, name: "Clothing", icon: <Shirt className="h-6 w-6" /> },
  { id: 7, name: "Household", icon: <Home className="h-6 w-6" /> },
  { id: 8, name: "Event & Party", icon: <PartyPopper className="h-6 w-6" /> },
  { id: 9, name: "Sports & Leisure", icon: <Smartphone className="h-6 w-6" /> },
  { id: 10, name: "Transportation", icon: <ShoppingBag className="h-6 w-6" /> },
  { id: 11, name: "Cooking", icon: <Utensils className="h-6 w-6" /> },
  { id: 12, name: "Computers", icon: <Laptop className="h-6 w-6" /> },
];

const ProductCategories = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(1);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white" id="browse">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Products</h2>
        
        {/* Main categories - horizontal scroll with navigation buttons */}
        <div className="relative mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-0 z-10 bg-white/80 backdrop-blur-sm border rounded-full shadow-sm hover:bg-gray-100 hidden md:flex"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div 
              className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-4 px-1"
              ref={scrollContainerRef}
              style={{ 
                scrollbarWidth: 'thin',
                msOverflowStyle: 'none'
              }}
            >
              <div className="flex space-x-4 min-w-max">
                {mainCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className={cn(
                      "flex-shrink-0 h-24 w-32 flex-col gap-2",
                      activeCategory === category.id ? "bg-primary text-white" : "bg-white"
                    )}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.icon}
                    <span className="text-sm">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 z-10 bg-white/80 backdrop-blur-sm border rounded-full shadow-sm hover:bg-gray-100 hidden md:flex"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Subcategories */}
        {activeCategory === 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mainCategories[0].subcategories.map((subcat, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="justify-start h-auto py-3 text-left"
              >
                <Music className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{subcat}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCategories;
