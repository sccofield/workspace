'use server';

import { createClient } from '@/utils/supabase/server';

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

  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error(userError.message);

  return {
    uid: user.user.id,
    email: user.user.email || '',
    name: user.user?.user_metadata?.name || '',
    phone: user.user?.user_metadata?.phone || '',
  };
}
