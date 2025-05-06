import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Dashboard from "./pages/Dashboard";
import LendBorrowSelection from "./pages/LendBorrowSelection";
import Lend from "./pages/Lend";
import Borrow from "./pages/Borrow";
import Profile from "./pages/Profile";
import LendedItems from "./pages/LendedItems";
import BorrowedItems from "@/pages/BorrowedItems";


const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  
  return <>{children}</>;
};

// App with authentication wrapper
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/events" element={<Events />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/lend-borrow" element={<ProtectedRoute><LendBorrowSelection /></ProtectedRoute>} />
      <Route path="/lend" element={<ProtectedRoute><Lend /></ProtectedRoute>} />
      <Route path="/borrow" element={<ProtectedRoute><Borrow /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/lended-items" element={<ProtectedRoute><LendedItems /></ProtectedRoute>} />
      <Route path="/borrowed-items" element={<ProtectedRoute><BorrowedItems /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
