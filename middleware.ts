import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const session = req.auth
  const isLoggedIn = !!session

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to dashboard if logged in and trying to access login/onboarding
  if ((req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/onboarding') && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

