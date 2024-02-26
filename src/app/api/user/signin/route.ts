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
      throw new Error("Invalid credentials");
    }
    return NextResponse.json(
      {
        name: user.name,
        salt: user.salt,
        iterations: user.iterations,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);
    const message =
      e.message === "Invalid credentials" ? e.message : "Internal server error";
    const status = e.message === "Invalid credentials" ? 401 : 500;
    return NextResponse.json({ error: message }, { status: status });
  }
}

// POST /api/user/signin
// @desc: Login user
export async function POST(request: NextRequest) {
  const body = await request.json();
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
      include: {
        company: true,
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
      company: user.company_id,
    };
    const jwt = await createJWT(jwtPayload);
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
    return NextResponse.json({ company: user?.company_id }, { status: 200 });
  } catch (e: any) {
    console.log(e);
    const message =
      e.message === "Invalid credentials" ? e.message : "Internal server error";
    const status = e.message === "Invalid credentials" ? 401 : 500;
    return NextResponse.json({ error: message }, { status: status });
  }

  // if (user.company_id) {
  // redirect("/invoice");
  // } else {
  // redirect("/customer/onboarding");
  // }
}
