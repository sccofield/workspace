import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(req: Request) {
  try {
    const { user_id, subscription_id, plan_name } = await req.json();

    // Step 1: Check if user has already checked in today
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

    // Step 2: Fetch subscription details to validate remaining days
    const { data: subscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select('days_remaining')
      .eq('id', subscription_id)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    const { days_remaining } = subscription;

    // Step 3: Validate that days_remaining is greater than 0
    if (days_remaining <= 0) {
      return NextResponse.json(
        { error: 'Subscription usage limit reached. Cannot check in.' },
        { status: 400 }
      );
    }

    // Step 4: Insert new check-in record
    const { error: insertError } = await supabase.from('check_ins').insert({
      user_id,
      subscription_id,
      plan_name,
      timestamp: new Date().toISOString(),
    });

    if (insertError) {
      throw new Error(insertError.message);
    }

    // Step 5: Decrease days_remaining in the subscription
    const updatedDaysRemaining = days_remaining - 1;

    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({ days_remaining: updatedDaysRemaining })
      .eq('id', subscription_id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    // Step 6: Return success response
    return NextResponse.json({
      message: 'Check-in successful!',
      subscription_id,
    });
  } catch (error) {
    console.error('Check-in error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
