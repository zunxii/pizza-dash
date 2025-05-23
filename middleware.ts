import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("Middleware executing for:", req.nextUrl.pathname);
    console.log("Token present:", !!req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (token) return true;
        if (req.nextUrl.pathname === "/") {
          return false;
        }
        
        return false;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/", "/all-orders"],
};