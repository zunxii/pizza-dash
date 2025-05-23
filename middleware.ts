import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // This function runs for authenticated requests
    // You can add additional logic here if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Return true if user should be allowed to access the page
        // token will be null if user is not authenticated
        return !!token
      },
    },
    pages: {
      signIn: '/login', // Redirect unauthenticated users to login page
    }
  }
)

// Configure which routes should be protected
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    '/',
    '/all-orders'
  ]
}