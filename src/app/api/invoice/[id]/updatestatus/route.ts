import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";
import { JWTPayload, JWTVerifyResult } from "jose";

// POST /api/invoice/:id/updatestatus
// @desc: Update a invoice status
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const session: JWTVerifyResult<JWTPayload> | null = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  try {
    const req = await request.json();
    const res = await prisma.invoice.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: req.status,
      },
      include: {
        items: true,
        customer: {
          include: {
            contact: true,
          },
        },
        company: true,
      },
    });

    return NextResponse.json(
      {
        res,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
