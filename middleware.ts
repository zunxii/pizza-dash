import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Just return next() for protected routes
    return
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow access if user has a valid token
        return !!token
      },
    },
    pages: {
      signIn: '/login',
    }
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - Any file with an extension (like .png, .jpg, etc.)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|login|.*\\.).*)'
  ]
}