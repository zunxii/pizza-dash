// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {
//     console.log("Middleware executing for:", req.nextUrl.pathname);
//     console.log("Token present:", !!req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         return !!token; 
//       },
//     },
//     pages: {
//       signIn: "/login",
//     },
//   }
// );

// export const config = {
//    matcher: ["/((?!login|_next|favicon.ico|images|api).*)"],
// };
