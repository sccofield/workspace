'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface User {
  uid: string;
  email: string;
  name: string;
  phone?: string;
}

interface WorkspaceState {
  user: User | null;
  subscriptions: any[];
  checkIns: any[];
  loading: boolean;
  error: string | null;
}

interface WorkspaceContextProps extends WorkspaceState {
  setUser: (user: User | null) => void;
  fetchAllData: () => Promise<void>;
  logout: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(
  undefined
);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<WorkspaceState>({
    user: null,
    subscriptions: [],
    checkIns: [],
    loading: true,
    error: null,
  });

  const router = useRouter();

  const supabase = createClient();

  // Function to set the user
  const setUser = (user: User | null) => {
    setState((prev) => ({ ...prev, user }));
  };

  // Function to fetch all data (subscriptions and check-ins)
  const fetchAllData = async () => {
    if (!state.user) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const [subscriptionsRes, checkInsRes] = await Promise.all([
        fetch(`/api/subscription/user/${state.user.uid}`),
        fetch(`/api/checkin/user/${state.user.uid}`),
      ]);

      if (!subscriptionsRes.ok || !checkInsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const subscriptions = await subscriptionsRes.json();
      const checkIns = await checkInsRes.json();

      setState((prev) => ({
        ...prev,
        subscriptions,
        checkIns,
        loading: false,
        error: null,
      }));
    } catch (error: any) {
      setState((prev) => ({ ...prev, loading: false, error: error.message }));
    }
  };

  // Function to handle logout
  const logout = async () => {
    await supabase.auth.signOut();
    setState({
      user: null,
      subscriptions: [],
      checkIns: [],
      loading: false,
      error: null,
    });
    router.push('/auth/login');
  };

  // UseEffect to fetch user on app load
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
        return;
      }

      if (data?.user) {
        setUser({
          uid: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name || '',
          phone: data.user.user_metadata?.phone || '',
        });
        await fetchAllData();
      } else {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchUser();
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{ ...state, setUser, fetchAllData, logout }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
