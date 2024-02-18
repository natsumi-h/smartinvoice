import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware");
  const url = new URL(request.url);
  const user: any = request.cookies.get("token");

  if (!user && url.pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (
    user &&
    (url.pathname === "/signin" ||
      url.pathname === "/signup" ||
      url.pathname === "/confirmsignup" ||
      url.pathname === "/confirminvite")
  ) {
    return NextResponse.redirect(new URL("/invoice", request.url));
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
  ],
};
