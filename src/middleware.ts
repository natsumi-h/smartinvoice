import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware");
  const url = new URL(request.url);
  const user: any = request.cookies.get("token");
  console.log(user);

  if (!user && url.pathname !== "/signin") {
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
  ],
};
