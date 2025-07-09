'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signUpUser, getUserByEmail } from '@/lib/data';
import type { MockUser } from '@/lib/types';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'admin' | 'staff' | 'user';
}

interface SignUpData {
    name: string;
    username: string;
    email: string;
    password?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: Omit<User, 'id'>) => void;
  signUp: (signUpData: SignUpData) => Promise<User>;
  updateUser: (updatedData: Partial<User>) => void;
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

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (userData: Omit<User, 'id'>) => {
    const existingUser = await getUserByEmail(userData.email);
    if(existingUser) {
        setUser({
            id: existingUser.id,
            name: existingUser.name,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
        });
    }
  };

  const signUp = async (signUpData: SignUpData): Promise<User> => {
    const newUser = await signUpUser(signUpData);
    login(newUser);
    return newUser;
  };

  const updateUser = (updatedData: Partial<User>) => {
    setUser(currentUser => {
        if (!currentUser) return null;
        return { ...currentUser, ...updatedData };
    })
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    signUp,
    updateUser,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
