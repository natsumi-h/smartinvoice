import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { checkIfUserIsLoggedIn } from "@/app/lib/apiMiddleware";

// POST /api/invoice/:id/delete
// @desc: Update a single customer
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkIfUserIsLoggedIn();
    const body = await request.json();
    const id = params.id;

    const res = await prisma.invoice.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...body,
        deletedAt: body.deleted ? new Date() : null,
      },
      include: {
        contact: true,
      },
    });
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    throw e;
  }
}
