import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";
import { JWTPayload, JWTVerifyResult } from "jose";

// POST /api/user/:id
// @desc: Update a single member
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session: JWTVerifyResult<JWTPayload> | null = await getSession();
  if (!session || !session.payload.role) {
    return NextResponse.json(new Error("Unauthorized"), { status: 401 });
  }

  try {
    const body = await request.json();
    const id = params.id;
    const res = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...body,
        deletedAt: body.deleted ? new Date() : null,
      },
    });
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.error(e);
    const message = e.message || "Internal Server Error";
    const status = e.status || 500;
    return NextResponse.json({ error: message }, { status });
  }
}
