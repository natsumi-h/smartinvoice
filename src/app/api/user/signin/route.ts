import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { createJWT, getExpiry } from "@/app/lib/action";
import { cookies } from "next/headers";

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
    const jwt = createJWT(jwtPayload);
    const expiry = getExpiry(jwt);
    const expiryDate = new Date(expiry);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        jwt,
        jwtExpiry: expiryDate,
      },
    });
    cookies().set("token", jwt, { expires: expiryDate, httpOnly: true });
    // 以下のJWTをフロントに返す実装は不要かも
    // return NextResponse.json({ token: jwt, expiryDate }, { status: 200 });

    return NextResponse.json({ company: user.company_id }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }

  // if (user.company_id) {
  // redirect("/invoice");
  // } else {
  // redirect("/customer/onboarding");
  // }
}
