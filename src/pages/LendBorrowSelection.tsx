
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, HandHeart, HandCoins } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const LendBorrowSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Would you like to Lend or Borrow items?</h1>
          <p className="text-xl text-gray-600">
            Choose an option below to continue
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-200 transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                <HandHeart className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Lend Items</CardTitle>
              <CardDescription>Share your items with neighbors</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-gray-600">
                List items you're willing to lend to others in your community. Help neighbors while making some extra money.
              </p>
              <Link to="/lend">
                <Button size="lg" className="w-full">Lend an Item</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow duration-200 transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                <HandCoins className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Borrow Items</CardTitle>
              <CardDescription>Find items you need in your community</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-gray-600">
                Browse items available to borrow from neighbors near you. Save money by borrowing instead of buying.
              </p>
              <Link to="/borrow">
                <Button size="lg" className="w-full">Browse Items</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center mt-8">
          <Link to="/dashboard">
            <Button variant="ghost" className="flex gap-2 items-center">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LendBorrowSelection;
