'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function registerAction(
  email: string,
  password: string,
  name: string
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role: 'user' },
    },
  });

  if (error) {
    throw new Error('Registration failed: ' + error.message);
  }

  // Redirect to verification page
  redirect(`/auth/verify?email=${encodeURIComponent(email)}`);
}
