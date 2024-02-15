import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { createJWT, getExpiry } from "@/app/lib/security";

// GET /api/user/signin?email=
// @desc: Get user login details
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email as string,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    // name/salt/iterationsだけを返す
    return NextResponse.json(
      {
        name: user.name,
        salt: user.salt,
        iterations: user.iterations,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}

// POST /api/user/signin
// @desc: Login user
export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const jwtPayload = {
      email: user.email,
      role: user.role,
      name: user.name,
      id: user.id,
    };
    const token = createJWT(jwtPayload);
    // console.log(token); //OK

    const expiry = getExpiry(token);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        jwt: token,
        jwtExpiry: new Date(expiry),
      },
    });
    // console.log(updatedUser); //OK
    return NextResponse.json({ token: token }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
