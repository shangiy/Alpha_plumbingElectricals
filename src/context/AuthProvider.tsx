'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { signUpUser, getUserByEmail } from '@/lib/data';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, User as FirebaseUser } from 'firebase/auth';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'admin' | 'staff' | 'user';
  avatarUrl?: string;
}

interface SignUpData {
    name: string;
    username: string;
    email: string;
    password?: string;
    avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: Omit<User, 'id'>) => Promise<void>;
  signUp: (signUpData: SignUpData) => Promise<User>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithFacebook: () => Promise<User | null>;
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

  // Initialize auth state
  useEffect(() => {
    // In a real app, you'd use onAuthStateChanged here
    // For this prototype, we simulate a small delay to handle hydration
    const timer = setTimeout(() => {
        setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback(async (userData: Omit<User, 'id'>) => {
    const existingUser = await getUserByEmail(userData.email);
    if(existingUser) {
        setUser({
            id: existingUser.id,
            name: existingUser.name,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
            avatarUrl: existingUser.avatarUrl,
        });
    }
  }, []);

  const handleSocialSignIn = useCallback(async (firebaseUser: FirebaseUser): Promise<User> => {
    if (!firebaseUser.email) {
        throw new Error('Social account must have an email address.');
    }
    
    let appUser = await getUserByEmail(firebaseUser.email);

    if (!appUser) {
        const newUser: SignUpData = {
            name: firebaseUser.displayName || 'Social User',
            username: firebaseUser.email.split('@')[0],
            email: firebaseUser.email,
            avatarUrl: firebaseUser.photoURL || undefined,
        };
        appUser = await signUpUser(newUser);
    }
    
    await login(appUser);
    return appUser;
  }, [login]);

  const signInWithGoogle = useCallback(async (): Promise<User | null> => {
      const provider = new GoogleAuthProvider();
      try {
          const result = await signInWithPopup(auth, provider);
          return await handleSocialSignIn(result.user);
      } catch (error: any) {
          console.error("Google sign-in error", error);
          if (error.code === 'auth/popup-closed-by-user') return null;
          throw new Error(error.message);
      }
  }, [handleSocialSignIn]);

  const signInWithFacebook = useCallback(async (): Promise<User | null> => {
      const provider = new FacebookAuthProvider();
      try {
          const result = await signInWithPopup(auth, provider);
          return await handleSocialSignIn(result.user);
      } catch (error: any) {
          console.error("Facebook sign-in error", error);
          if (error.code === 'auth/popup-closed-by-user') return null;
          throw new Error(error.message);
      }
  }, [handleSocialSignIn]);

  const signUp = useCallback(async (signUpData: SignUpData): Promise<User> => {
    const newUser = await signUpUser(signUpData);
    await login(newUser);
    return newUser;
  }, [login]);

  const updateUser = useCallback((updatedData: Partial<User>) => {
    setUser(currentUser => {
        if (!currentUser) return null;
        return { ...currentUser, ...updatedData };
    })
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = {
    user,
    login,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    updateUser,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
