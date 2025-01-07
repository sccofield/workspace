import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(req: Request) {
  try {
    const { user_id, subscription_id } = await req.json();

    // Check if user has already checked in today
    const today = new Date().toISOString().split('T')[0];
    const { data: existingCheckin, error: checkinError } = await supabase
      .from('check_ins')
      .select('*')
      .eq('user_id', user_id)
      .eq('subscription_id', subscription_id)
      .gte('timestamp', today)
      .single();

    if (checkinError && checkinError.code !== 'PGRST116') {
      throw new Error(checkinError.message);
    }

    if (existingCheckin) {
      return NextResponse.json(
        { error: 'User has already checked in today for this subscription' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('check_ins').insert({
      user_id,
      subscription_id,
      timestamp: new Date().toISOString(),
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: 'Check-in successful!' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
