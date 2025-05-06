import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  location: string;
}

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string, location: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on component mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Get users from localStorage
    const usersJson = localStorage.getItem('users');
    if (!usersJson) {
      toast({
        title: "Login failed",
        description: "No registered users found.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const users = JSON.parse(usersJson);
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (foundUser) {
        // Save current user to localStorage (without password)
        const userData = { id: foundUser.id, name: foundUser.name, email: foundUser.email, location: foundUser.location };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);

        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Error during login', error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred during login.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const signup = async (name: string, email: string, password: string, location: string): Promise<boolean> => {
    // Get existing users or initialize empty array
    const usersJson = localStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Check if email is already registered
    if (users.some((user: any) => user.email === email)) {
      toast({
        title: "Signup failed",
        description: "Email is already registered.",
        variant: "destructive",
      });
      return false;
    }

    // Add new user
    const newUser = { id: Date.now().toString(), name, email, password, location };
    users.push(newUser);
    
    // Save updated users array
    localStorage.setItem('users', JSON.stringify(users));
    
    toast({
      title: "Account created successfully",
      description: "Please log in with your new account.",
    });
    return true;
  };

  console.log("Current user:", user);
  console.log("Listings in localStorage:", JSON.parse(localStorage.getItem('listings')));

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
