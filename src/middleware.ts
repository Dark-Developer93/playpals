import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth((req) => {
  if (req.nextUrl.pathname) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (!req.nextauth.token.user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (!req.nextauth.token.user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!register|api|login|reset-password|privacy-and-policy|$).*)'],
};
