import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { checkIfUserIsLoggedIn } from "@/app/lib/apiMiddleware";

// POST /api/invoice/:id/updatestatus
// @desc: Update a invoice status
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkIfUserIsLoggedIn();
    const id = params.id;
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
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
