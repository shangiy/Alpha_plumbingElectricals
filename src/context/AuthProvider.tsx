'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for an existing session on mount
  useEffect(() => {
    // In a real app, you'd check localStorage or make an API call
    // For now, we'll just assume no user is logged in on mount.
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    // In a real app, you'd get this from an API response
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
