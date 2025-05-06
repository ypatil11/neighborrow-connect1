
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">NeighBorrow</h3>
            <p className="text-gray-600 mb-4">
              Connect with your neighbors to share items, skills, and create a stronger community.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Pricing</a></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Blog</a></li>
              <li><Link to="/events" className="text-gray-600 hover:text-primary transition-colors">Events</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Cookies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Licenses</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-center text-sm">
            © {new Date().getFullYear()} NeighBorrow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
