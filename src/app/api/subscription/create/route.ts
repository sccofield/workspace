import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(req: Request) {
  // Log request details for debugging
  try {
    console.log('Request Details:', {
      method: req.method, // HTTP method
      url: req.url, // Full URL of the request
      headers: Object.fromEntries(req.headers), // Headers as key-value pairs
    });

    // Parse and log the request body
    const {
      user_id,
      plan_id,
      plan_name,
      amount,
      daysAllocated,
      validityDays,
      payment_reference,
    } = await req.json();

    console.log('Request Body:', {
      user_id,
      plan_id,
      plan_name,
      amount,
      daysAllocated,
      validityDays,
      payment_reference,
    });

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
    });

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Subscription inserted successfully');
    return NextResponse.json({ message: 'Subscription created successfully' });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
