import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { cookies } from "next/headers";
import { checkIfUserIsLoggedIn } from "@/app/lib/apiMiddleware";

// POST /api/user/signout
// @desc: Sign out a user
export async function POST(request: NextRequest) {
  try {
    await checkIfUserIsLoggedIn();
    const body = await request.json();
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { jwt: null, jwtExpiry: null },
    });
    cookies().set("token", "", { expires: new Date(0) });
    return NextResponse.json("signout success", { status: 200 });
  } catch (e: any) {
    console.error(e);
    const message = e.message || "Internal Server Error";
    const status = e.status || 500;
    return NextResponse.json({ error: message }, { status });
  }
}
