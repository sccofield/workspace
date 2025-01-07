import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default function Callback() {
  useEffect(() => {
    const handleCallback = async () => {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );

      if (error) {
        console.error('Error processing callback:', error);
        redirect('/error');
      } else {
        redirect('/dashboard');
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg font-medium">Processing...</p>
    </div>
  );
}
