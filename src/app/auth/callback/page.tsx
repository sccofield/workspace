'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function Callback() {
  const [message, setMessage] = useState('Processing...');
  const router = useRouter();

  useEffect(() => {
    const processAuthCallback = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );

      if (error) {
        setMessage('Error processing confirmation: ' + error.message);
        console.error('Error:', error);
      } else {
        setMessage('Email confirmed successfully! Redirecting...');
        setTimeout(() => router.push('/dashboard'), 2000);
      }
    };

    processAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
