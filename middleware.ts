import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'de'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const PUBLIC_FILE = /\.(.*)$/;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}/groups/form`, request.url));
  }

  const isLocaleRoot = locales.some((locale) => pathname === `/${locale}`);
  if (isLocaleRoot) {
    return NextResponse.redirect(new URL(`${pathname}/groups/form`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/en', '/de', '/((?!_next|api|favicon.ico|.*\\.).*)'],
};
