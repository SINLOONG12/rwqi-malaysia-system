import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

// List of authorized email domains that can access the system
const AUTHORIZED_DOMAINS = [
  'gmail.com',
  'moe-dl.edu.my',
  'riverquality.my'
];

type User = {
  id: string;
  email: string;
  name: string;
  role: "government" | "cleanup" | "public" | "publisher";
  photoURL?: string;
  organization?: string;
  position?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthorized: (email: string) => boolean;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
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
    if (!email) return false;
    const domain = email.split('@')[1];
    return AUTHORIZED_DOMAINS.includes(domain);
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
      // Check if email domain is authorized
      if (!isAuthorized(email)) {
        toast.error("Unauthorized email domain. Please use a valid Gmail or educational account.");
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
  
  // Updated Google login simulation with organization and position
  const loginWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    
    try {
      // In a real app, this would interact with Google Auth API
      // For this demo, we'll simulate a successful Google login with mock data
      
      // Generate mock Google account data
      const domains = ['gmail.com', 'moe-dl.edu.my', 'riverquality.my'];
      const randomDomain = domains[Math.floor(Math.random() * domains.length)];
      const randomName = `user${Math.floor(Math.random() * 1000)}`;
      const mockEmail = `${randomName}@${randomDomain}`;
      
      // Organizations based on domain
      const organizations = {
        'gmail.com': ['River Conservation Group', 'Water Quality Initiative', 'Environmental Protection Team'],
        'moe-dl.edu.my': ['Department of Education', 'School of Environmental Studies', 'Research Institute'],
        'riverquality.my': ['River Quality Authority', 'Water Management Division', 'Environmental Monitoring Unit']
      };
      
      // Positions based on role
      const positions = {
        'government': ['Water Quality Manager', 'Environmental Officer', 'Policy Coordinator'],
        'cleanup': ['Field Coordinator', 'Cleanup Team Leader', 'Volunteer Manager'],
        'publisher': ['Content Editor', 'Data Analyst', 'Reports Manager'],
        'public': ['Community Member', 'Concerned Citizen', 'Volunteer']
      };
      
      const role = determineUserRole(mockEmail);
      const organization = organizations[randomDomain as keyof typeof organizations][Math.floor(Math.random() * 3)];
      const position = positions[role][Math.floor(Math.random() * 3)];
      
      // Create a mock user from the Google account with organization and position
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email: mockEmail,
        name: randomName,
        role: role,
        photoURL: `https://ui-avatars.com/api/?name=${randomName}&background=random`,
        organization: organization,
        position: position
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success("Google login successful");
      
      console.log("Logged in with Google:", newUser);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      toast.error("Google login failed");
      setLoading(false);
      return false;
    }
  };
  
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Check if email domain is authorized
      if (!isAuthorized(email)) {
        toast.error("Unauthorized email domain. Please use a valid Gmail or educational account.");
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
  
  // Add profile update functionality
  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    try {
      if (user) {
        const updatedUser = { ...user, ...profileData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success("Profile updated successfully");
        return true;
      }
      return false;
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error("Failed to update profile");
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, signup, logout, isAuthorized, updateProfile }}>
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
