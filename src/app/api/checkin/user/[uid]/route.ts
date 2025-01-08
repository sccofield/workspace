import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
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
    console.error('Error handling request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
