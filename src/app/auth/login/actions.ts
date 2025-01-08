'use server';

import { createClient } from '@/utils/supabase/server';

export async function loginAction(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('Login failed: ' + error.message);
  }

  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error(userError.message);

  return {
    uid: user.user.id,
    email: user.user.email!,
    name: user.user?.user_metadata?.name || '',
    phone: user.user?.user_metadata?.phone || '',
  };
}
