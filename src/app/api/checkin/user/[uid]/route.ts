import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(req: Request, context: { params: { uid: string } }) {
  const { params } = context;

  if (!params?.uid) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const { uid } = params;

  try {
    const { data, error } = await supabase
      .from('check_ins')
      .select('*')
      .eq('user_id', uid)
      .order('timestamp', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
