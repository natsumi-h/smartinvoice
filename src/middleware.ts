import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware");
  const url = new URL(request.url);
  const user = request.cookies.get("token");

  if (!user && url.pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // パスが/apiの場合
  // リクエストのヘッダーにクッキーがあるかどうか
  // なければリダイレクト
  // if (url.pathname.startsWith("/api")) {
  //   if (!request.cookies.get("token")) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  //   }
  // }

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
    "/invoice/:path",
    "/account/:patht",
    "/company/:path",
    // "/customer/:path",
    "/customer",
    "/customer/onboarding",
  ],
};
