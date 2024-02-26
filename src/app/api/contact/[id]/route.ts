import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";
import { checkIfUserIsLoggedIn } from "@/app/lib/apiMiddleware";

// POST /api/contact/:id
// @desc: Update single contact
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkIfUserIsLoggedIn();
    const body = await request.json();
    const id = params.id;

    const res = await prisma.contact.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...body,
        deletedAt: body.deleted ? new Date() : null,
      },
    });

    if (body.isPrimary) {
      const primary = await prisma.contact.findFirst({
        where: {
          customer_id: res.customer_id,
          isPrimary: true,
          id: {
            not: parseInt(id),
          },
        },
      });
      if (primary) {
        await prisma.contact.update({
          where: {
            id: primary.id,
          },
          data: {
            isPrimary: false,
          },
        });
      }
    }

    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
