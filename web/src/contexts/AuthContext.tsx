import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
  avatar: string;
  hasCompletedOnboarding: boolean;
  profile?: any;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (profileData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // For static deployment, immediately set a mock user and no loading
  const mockUser: User = {
    id: '1',
    name: 'Demo User',
    email: 'demo@jobswipe.ai',
    provider: 'demo',
    avatar: 'https://via.placeholder.com/32x32/6366f1/ffffff?text=U',
    hasCompletedOnboarding: true,
    profile: {}
  };

  const [user, setUser] = useState<User | null>(mockUser);
  const [isLoading, setIsLoading] = useState(false); // No loading for static deployment

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(mockUser); // Keep mock user instead of null
  };

  const updateProfile = (profileData: any) => {
    if (user) {
      const updatedUser = { ...user, profile: profileData };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}