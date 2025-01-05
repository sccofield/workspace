'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        Welcome, {user.email}
      </h1>
      <p>Your account has been verified and you are logged in!</p>
    </div>
  );
}
