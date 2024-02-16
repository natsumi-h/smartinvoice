import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware");
  const url = new URL(request.url);
  const currentUser = request.cookies.get("token");

  if (!currentUser && url.pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/invoice/:path",
    "/account/:patht",
    "/company/:path",
    "/customer/:path",
  ],
};
