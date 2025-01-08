import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(req: Request) {
  // Log request details for debugging
  try {
    // Parse and log the request body
    const {
      user_id,
      plan_name,
      amount,
      daysAllocated,
      validityDays,
      payment_reference,
    } = await req.json();

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${payment_reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Payment verification failed.');
    }

    const data = await response.json();
    if (data.status !== true || data.data.status !== 'success') {
      throw new Error('Invalid payment reference.');
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + validityDays);

    // Attempt to insert the subscription into Supabase
    const { error } = await supabase.from('subscriptions').insert({
      user_id,
      amount,
      plan: plan_name,
      days_allocated: daysAllocated,
      expiry_date: expiryDate,
      payment_reference,
      days_remaining: daysAllocated,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Subscription created successfully' });
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
