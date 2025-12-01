'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthContext as AuthContextType } from '@/types/franchise';
import { login, logout, getCurrentUser, getAuthToken } from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (token) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const { user: newUser } = await login(email, password);
    setUser(newUser);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
