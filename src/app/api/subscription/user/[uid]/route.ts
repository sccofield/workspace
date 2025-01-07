import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(req: Request, { params }) {
  // Step 1: Log the entire request object for debugging
  console.log('Received Request:', {
    method: req.method,
    url: req.url,
    params,
  });

  // Step 2: Check if `params.uid` exists
  if (!params || !params.uid) {
    console.error('Error: UID is missing from request parameters.');
    return NextResponse.json(
      { error: 'Missing UID parameter' },
      { status: 400 }
    );
  }

  const { uid } = params;

  try {
    // Step 3: Log the user ID being queried
    console.log('Fetching subscriptions for UID:', uid);

    // Step 4: Query the Supabase database
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', uid);

    // Step 5: Log the database response or error
    if (error) {
      console.error('Supabase Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Fetched Data:', data);

    // Step 6: Return the fetched data
    return NextResponse.json(data);
  } catch (error) {
    // Step 7: Log unexpected errors
    console.error('Unexpected Error:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
