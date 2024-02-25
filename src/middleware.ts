import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./app/lib/action";

export async function middleware(request: NextRequest) {
  console.log("middleware");
  const url = new URL(request.url);
  const session = await getSession();
  console.log(session);

  if (
    session &&
    (url.pathname === "/signin" ||
      url.pathname === "/signup" ||
      url.pathname === "/confirmsignup" ||
      url.pathname === "/confirminvite")
  ) {
    return NextResponse.redirect(new URL("/invoice", request.url));
  }

  if (
    !session &&
    (url.pathname.includes("/invoice") ||
      url.pathname.includes("/account") ||
      url.pathname.includes("/company") ||
      url.pathname.includes("/customer"))
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    // ↓のパスがミドルウェアを通る
    "/invoice/:path*",
    "/account/:path*",
    "/company/:path*",
    "/customer/:path*",
    "/signin",
    "/signup",
    "/confirmsignup",
    "/confirminvite",
  ],
};
