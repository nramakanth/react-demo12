import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/register'

  // Get the token from the cookies
  const token = request.cookies.get('user')?.value || ''

  // If trying to access a protected route without being logged in
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If trying to access login/register while logged in
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/home',
    // Add other protected routes here
  ]
} 