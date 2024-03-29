import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { sendEmail } from "@/app/lib/sendEmail";
import crypto from "crypto";

function generateRandomToken(length: number) {
  return crypto.randomBytes(length).toString("hex");
}

// POST /api/user/signup
// @desc: Register a new user
export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = generateRandomToken(16);
  try {
    const res = await prisma.user.create({
      data: {
        ...body,
        token,
        tokenExpiry: new Date(Date.now() + 3600000),
        role: "Admin",
      },
    });

    await sendEmail({
      type: "signup",
      payload: {
        userEmail: res.email,
        userName: res.name,
        token: res.token,
      },
    });

    return NextResponse.json({ data: res }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
