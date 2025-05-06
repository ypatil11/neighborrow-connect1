// //1. ====================================================================================================
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { ArrowLeft } from "lucide-react"; // Import the back arrow icon

// // Import images (replace with your actual image paths)
// import AddItemsImg from "@/assets/images/add-items.png";
// import AcceptImg from "@/assets/images/accept.png";
// import FreeOrFeeImg from "@/assets/images/free-or-fee.jpeg";
// import WarrantyImg from "@/assets/images/warranty.jpeg";
// import SearchImg from "@/assets/images/search.png";
// import VerifyImg from "@/assets/images/verify.png";
// import RequestImg from "@/assets/images/request.jpeg";
// import EnjoyImg from "@/assets/images/enjoy.jpeg";

// const HowItWorks = () => {
//   const [showBorrow, setShowBorrow] = useState(true); // State to toggle between Borrow and Lend

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary/30 to-white pt-16">
//       <div className="container mx-auto px-4 py-16 text-center relative">
//         {/* Back Button */}
//         <div className="absolute top-4 left-4">
//           <Link to="/">
//             <Button
//               variant="ghost"
//               className="flex items-center gap-2 text-gray-600 hover:text-primary"
//             >
//               <ArrowLeft className="w-5 h-5" /> Back to Home
//             </Button>
//           </Link>
//         </div>

//         <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12 tracking-tight">
//           How NeighBorrow Works
//         </h1>

//         {/* Toggle Buttons */}
//         <div className="flex justify-center gap-4 mb-12">
//           <Button
//             size="lg"
//             onClick={() => setShowBorrow(true)}
//             className={`${
//               showBorrow ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
//             } hover:bg-primary/90 transition-colors`}
//           >
//             Borrow
//           </Button>
//           <Button
//             size="lg"
//             onClick={() => setShowBorrow(false)}
//             className={`${
//               !showBorrow ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
//             } hover:bg-primary/90 transition-colors`}
//           >
//             Lend
//           </Button>
//         </div>

//         {/* Borrow Section */}
//         {showBorrow && (
//           <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
//             <h2 className="text-2xl font-semibold text-primary mb-6">Borrow</h2>
//             <ol className="text-left text-gray-600 space-y-6">
//               <li className="flex items-start space-x-6">
//                 <img src={SearchImg} alt="Search" className="w-24 h-24 rounded-lg" />
//                 <div>
//                   <strong className="text-xl">1. Search</strong>
//                   <p className="mt-2">Search for a product near you</p>
//                 </div>
//               </li>
//               <li className="flex items-start space-x-6">
//                 <img src={VerifyImg} alt="Verify" className="w-24 h-24 rounded-lg" />
//                 <div>
//                   <strong className="text-xl">2. Verify</strong>
//                   <p className="mt-2">Verify your profile to become part of the local sharing community</p>
//                 </div>
//               </li>
//               <li className="flex items-start space-x-6">
//                 <img src={RequestImg} alt="Request" className="w-24 h-24 rounded-lg" />
//                 <div>
//                   <strong className="text-xl">3. Request</strong>
//                   <p className="mt-2">Request from a neighbor, see availability, and book</p>
//                 </div>
//               </li>
//               <li className="flex items-start space-x-6">
//                 <img src={EnjoyImg} alt="Enjoy" className="w-24 h-24 rounded-lg" />
//                 <div>
//                   <strong className="text-xl">4. Enjoy</strong>
//                   <p className="mt-2">Make use of the item, enjoy, and bring it back at the arranged time</p>
//                 </div>
//               </li>
//             </ol>
//             {/* Start Borrowing Button */}
//             <div className="mt-8">
//               <Link to="/signin">
//                 <Button
//                   size="lg"
//                   className="bg-primary hover:bg-primary/90 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
//                 >
//                   Start Borrowing
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         )}

//         {/* Lend Section */}
//         {!showBorrow && (
//           <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
//             <h2 className="text-2xl font-semibold text-primary mb-6">Lend</h2>
//             <ol className="text-left text-gray-600 space-y-6">
//               <li className="flex items-start space-x-6">
//                 <img src={AddItemsImg} alt="Add Items" className="w-24 h-24 rounded-lg" />
//                 <div>
//                   <strong className="text-xl">1. Add items</strong>
//                   <p className="mt-2">Add items or check what your neighbors are looking for</p>
//                 </div>
//               </li>
//               <li className="flex items-start space-x-6">
//                 <img src={AcceptImg} alt="Accept" className="w-24 h-24 rounded-lg" />
//                 <div>
//                   <strong className="text-xl">2. Accept</strong>
//                   <p className="mt-2">Check requests from neighbors; accept if it suits you</p>
//                 </div>
//               </li>
//               <li className="flex items-start space-x-6">
//                 <img src={FreeOrFeeImg} alt="Free or Fee" className="w-24 h-24 rounded-lg" />
//                 <div>
//                   <strong className="text-xl">3. Free or fee</strong>
//                   <p className="mt-2">Decide if your listing is free or for a fee</p>
//                 </div>
//               </li>
//               <li className="flex items-start space-x-6">
//                 <img src={WarrantyImg} alt="Warranty" className="w-24 h-24 rounded-lg" />
//                 <div>
//                   <strong className="text-xl">4. Warranty</strong>
//                   <p className="mt-2">Accidents rarely happen, but don't worry, Peerby's warranty has you covered!</p>
//                 </div>
//               </li>
//             </ol>
//             {/* Start Lending Button */}
//             <div className="mt-8">
//               <Link to="/signin">
//                 <Button
//                   size="lg"
//                   className="bg-primary hover:bg-primary/90 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
//                 >
//                   Start Lending
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;

// //2. ====================================================================================================
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Import the back arrow icon

// Import images (replace with your actual image paths)
import AddItemsImg from "@/assets/images/add-items.png";
import AcceptImg from "@/assets/images/accept.png";
import FreeOrFeeImg from "@/assets/images/free-or-fee.jpeg";
import WarrantyImg from "@/assets/images/warranty.jpeg";
import SearchImg from "@/assets/images/search.png";
import VerifyImg from "@/assets/images/verify.png";
import RequestImg from "@/assets/images/request.jpeg";
import EnjoyImg from "@/assets/images/enjoy.jpeg";

const HowItWorks = () => {
  const [showBorrow, setShowBorrow] = useState(true); // State to toggle between Borrow and Lend

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary/30 to-white pt-16">
      <div className="container mx-auto px-4 py-16 text-center relative">
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link to="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12 tracking-tight">
          How NeighBorrow Works
        </h1>

        {/* Toggle Buttons with Hover Zoom Effect */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            size="lg"
            onClick={() => setShowBorrow(true)}
            className={`${
              showBorrow ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-primary/90 transition-all duration-300 hover:scale-105`}
          >
            Borrow
          </Button>
          <Button
            size="lg"
            onClick={() => setShowBorrow(false)}
            className={`${
              !showBorrow ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-primary/90 transition-all duration-300 hover:scale-105`}
          >
            Lend
          </Button>
        </div>

        {/* Borrow Section */}
        {showBorrow && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-primary mb-6">Borrow</h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
              <li className="flex flex-col items-center text-center">
                <img src={SearchImg} alt="Search" className="w-32 h-32 rounded-lg mb-4" />
                <div>
                  <strong className="text-xl">1. Search</strong>
                  <p className="mt-2">Search for a product near you</p>
                </div>
              </li>
              <li className="flex flex-col items-center text-center">
                <img src={VerifyImg} alt="Verify" className="w-32 h-32 rounded-lg mb-4" />
                <div>
                  <strong className="text-xl">2. Verify</strong>
                  <p className="mt-2">Verify your profile to become part of the local sharing community</p>
                </div>
              </li>
              <li className="flex flex-col items-center text-center">
                <img src={RequestImg} alt="Request" className="w-32 h-32 rounded-lg mb-4" />
                <div>
                  <strong className="text-xl">3. Request</strong>
                  <p className="mt-2">Request from a neighbor, see availability, and book</p>
                </div>
              </li>
              <li className="flex flex-col items-center text-center">
                <img src={EnjoyImg} alt="Enjoy" className="w-32 h-32 rounded-lg mb-4" />
                <div>
                  <strong className="text-xl">4. Enjoy</strong>
                  <p className="mt-2">Make use of the item, enjoy, and bring it back at the arranged time</p>
                </div>
              </li>
            </ol>
            {/* Start Borrowing Button */}
            <div className="mt-8">
              <Link to="/signin">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Start Borrowing
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Lend Section */}
        {!showBorrow && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-primary mb-6">Lend</h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
              <li className="flex flex-col items-center text-center">
                <img src={AddItemsImg} alt="Add Items" className="w-32 h-32 rounded-lg mb-4" />
                <div>
                  <strong className="text-xl">1. Add items</strong>
                  <p className="mt-2">Add items or check what your neighbors are looking for</p>
                </div>
              </li>
              <li className="flex flex-col items-center text-center">
                <img src={AcceptImg} alt="Accept" className="w-32 h-32 rounded-lg mb-4" />
                <div>
                  <strong className="text-xl">2. Accept</strong>
                  <p className="mt-2">Check requests from neighbors; accept if it suits you</p>
                </div>
              </li>
              <li className="flex flex-col items-center text-center">
                <img src={FreeOrFeeImg} alt="Free or Fee" className="w-32 h-32 rounded-lg mb-4" />
                <div>
                  <strong className="text-xl">3. Free or fee</strong>
                  <p className="mt-2">Decide if your listing is free or for a fee</p>
                </div>
              </li>
              <li className="flex flex-col items-center text-center">
                <img src={WarrantyImg} alt="Warranty" className="w-32 h-32 rounded-lg mb-4" />
                <div>
                  <strong className="text-xl">4. Warranty</strong>
                  <p className="mt-2">Accidents rarely happen, but don't worry, Peerby's warranty has you covered!</p>
                </div>
              </li>
            </ol>
            {/* Start Lending Button */}
            <div className="mt-8">
              <Link to="/signin">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Start Lending
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;