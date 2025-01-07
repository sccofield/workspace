'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function verifyAction(email: string, code: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: 'signup',
  });

  if (error) {
    throw new Error('Invalid or expired verification code.');
  }

  // Redirect to dashboard upon success
  redirect('/dashboard');
}
