'use client'; // Add this at the top to make the file a client component

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface User {
  uid: string;
  email: string;
  name: string;
  phone?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        if (error.message === 'Auth session missing!') {
          console.warn('No active session found, user is not logged in.');

          return;
        }
        console.error('Error fetching user:', error.message);
        return;
      }

      if (data?.user) {
        setUser({
          uid: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name || '',
          phone: data.user.user_metadata?.phone || '',
        });
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
