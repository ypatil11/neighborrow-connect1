
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FEATURED_ITEMS = [
  {
    title: "Power Drill",
    category: "Tools",
    owner: "Sarah M.",
    distance: "0.5 miles",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "Mountain Bike",
    category: "Sports",
    owner: "Mike R.",
    distance: "0.8 miles",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "Camping Tent",
    category: "Outdoor",
    owner: "John D.",
    distance: "1.2 miles",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=400",
  },
];

const FeaturedItems = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Featured Items</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Available in Your Area</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover items your neighbors are sharing. From tools to sports equipment, find what you need.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_ITEMS.map((item) => (
            <Card key={item.title} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Badge className="mb-2">{item.category}</Badge>
                <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.owner}</span>
                    <span>{item.distance}</span>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
