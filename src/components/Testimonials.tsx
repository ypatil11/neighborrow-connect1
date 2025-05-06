
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    quote: "I like Neighborrow for its ease of use. Found exactly what I needed for my weekend project without having to buy something I'd only use once.",
    author: "Andy",
    location: "Amsterdam",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 2,
    quote: "I found a jigsaw in 30 minutes from a neighbor just two blocks away. Saved money and made a new connection in my community!",
    author: "Astrid",
    location: "Utrecht",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 3,
    quote: "Helping people out by lending my rarely used tools feels great. Plus, I've borrowed things I needed temporarily without the hassle of buying.",
    author: "Breg",
    location: "Amsterdam",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Why Members Love Neighborrow</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <p className="text-gray-600 mb-6">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
