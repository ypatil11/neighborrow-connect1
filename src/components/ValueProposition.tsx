
import { Home, Smile, Globe, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const valueProps = [
  {
    id: 1,
    icon: <Home className="h-8 w-8 text-primary" />,
    title: "Save & Earn",
    description: "On things you need only now and then"
  },
  {
    id: 2,
    icon: <Smile className="h-8 w-8 text-primary" />,
    title: "Support your neighborhood",
    description: "Sharing feels good!"
  },
  {
    id: 3,
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Do more with less",
    description: "And save raw materials, CO2, and waste"
  },
  {
    id: 4,
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Share Safely",
    description: "With guarantee against damage or loss"
  }
];

const ValueProposition = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">It's good(s) for everyone</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Join our community and discover the benefits of sharing resources
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {valueProps.map((prop) => (
            <Card key={prop.id} className="bg-white hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">
                  {prop.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{prop.title}</h3>
                <p className="text-gray-600">{prop.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/signup">
            <Button size="lg" className="px-8">
              Join
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
