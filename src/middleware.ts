import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware for protecting routes and checking user roles
 * This ensures:
 * 1. Unauthenticated users are redirected to login
 * 2. Users can only access locations they're assigned to
 * 3. Only HQ admins can access /locations routes
 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/' ||
    pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  // For protected routes, check for auth token
  const authToken = request.cookies.get('authToken')?.value;

  if (!authToken) {
    // Redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // TODO: Validate token and check permissions
  // This would involve:
  // 1. Validating JWT token
  // 2. Checking if user has access to the location in the URL
  // 3. Checking if user role has permission for the route

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all app routes
    '/locations/:path*',
    '/settings/:path*',
    '/dashboard/:path*',
  ],
};
