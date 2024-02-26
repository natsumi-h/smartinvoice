import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { sendEmail } from "@/app/lib/sendEmail";
import crypto from "crypto";
import { getSession } from "@/app/lib/action";
import { JWTPayload, JWTVerifyResult } from "jose";

function generateRandomToken(length: number) {
  return crypto.randomBytes(length).toString("hex");
}

// POST /api/user/invite
// @desc: Invite a new user
export async function POST(request: NextRequest) {
  const session: JWTVerifyResult<JWTPayload> | null = await getSession();
  if (!session || session.payload.role !== "Admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const token = generateRandomToken(16);
  const company = session.payload.company;

  //TODO:Duplicate email check among all orgs?
  //TODO：Duplicate email check within same org

  try {
    const res = await prisma.user.create({
      data: {
        ...body,
        token,
        tokenExpiry: new Date(Date.now() + 3600000),
        company: {
          connect: {
            id: company,
          },
        },
      },
    });
    console.log(res);

    await sendEmail({
      type: "invite",
      payload: {
        userEmail: res.email,
        userName: res.name,
        token: res.token,
      },
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (e: any) {
    console.log(e);
    const message =
      e.message === "Invalid credentials" ? e.message : "Internal server error";
    const status = e.message === "Invalid credentials" ? 401 : 500;
    return NextResponse.json({ error: message }, { status: status });
  }
}
