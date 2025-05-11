
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

// List of authorized emails that can access the system
const AUTHORIZED_EMAILS = [
  'admin@riverquality.my',
  'government@riverquality.my', 
  'cleanup@riverquality.my',
  'publisher@riverquality.my'
];

type User = {
  id: string;
  email: string;
  name: string;
  role: "government" | "cleanup" | "public" | "publisher";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthorized: (email: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if there's a stored user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const isAuthorized = (email: string): boolean => {
    return AUTHORIZED_EMAILS.includes(email.toLowerCase());
  };

  const determineUserRole = (email: string): "government" | "cleanup" | "public" | "publisher" => {
    const lowerEmail = email.toLowerCase();
    if (lowerEmail.includes('government')) return 'government';
    if (lowerEmail.includes('cleanup')) return 'cleanup';
    if (lowerEmail.includes('publisher')) return 'publisher';
    return 'public';
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Check if email is in the authorized list
      if (!isAuthorized(email)) {
        toast.error("Unauthorized email address");
        setLoading(false);
        return false;
      }
      
      // Simple validation - in a real app, this would connect to a backend
      if (password.length < 6) {
        toast.error("Invalid credentials");
        setLoading(false);
        return false;
      }
      
      // Create mock user based on email
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email: email.toLowerCase(),
        name: email.split('@')[0],
        role: determineUserRole(email)
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success("Login successful");
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed");
      setLoading(false);
      return false;
    }
  };
  
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Check if email is in the authorized list
      if (!isAuthorized(email)) {
        toast.error("This email is not authorized to create an account");
        setLoading(false);
        return false;
      }
      
      // Simple validation - in a real app, this would connect to a backend
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setLoading(false);
        return false;
      }
      
      // Create mock user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email: email.toLowerCase(),
        name,
        role: determineUserRole(email)
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success("Account created successfully");
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error("Registration failed");
      setLoading(false);
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
