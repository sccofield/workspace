import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Ensure this is called to validate the user's session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedRoutes = ['/dashboard']; // List of protected routes
  const path = request.nextUrl.pathname;

  if (
    !user &&
    protectedRoutes.some((route) => path.startsWith(route)) &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // Redirect unauthenticated users trying to access protected routes
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirect', path); // Add redirect param for post-login redirect
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
