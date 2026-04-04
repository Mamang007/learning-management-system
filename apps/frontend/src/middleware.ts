import { auth } from '@/lib/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');

  if (isAuthPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/', req.nextUrl));
    }
    return;
  }
});

export const config = {
  matcher: ['/login', '/register'],
};
