import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/db";

// POST /api/user/confirminvite?token=
// @desc: Confirm user invitation
export async function POST(request: NextRequest) {
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  // TODO: Handle token expiry
  try {
    const user = await prisma.user.findFirst({
      where: {
        token: token as string,
        // tokenExpiry: {
        //   gt: new Date(),
        // },
      },
    });
    if (!user) {
      throw new Error("User not found or token expired");
    }

    const res = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: body.password,
        salt: body.salt,
        iterations: body.iterations,
        token: null,
        tokenExpiry: null,
        signupDone: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        company_id: true,
      },
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (e: any) {
    console.log(e);
    const message =
      e.message === "User not found or token expired" ? e.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
