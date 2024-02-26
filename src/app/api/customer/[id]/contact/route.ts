import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";

// POST /api/customer/:id/contact
// @desc: Create a new contact for a customer
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(new Error("Unauthorized"), { status: 401 });
  }

  try {
    const body = await request.json();
    const id = params.id;

    const res = await prisma.contact.create({
      data: {
        ...body,
        customer_id: parseInt(id),
      },
    });

    if (body.isPrimary) {
      const primary = await prisma.contact.findFirst({
        where: {
          customer_id: parseInt(id),
          isPrimary: true,
          id: {
            not: res.id,
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

    return NextResponse.json(res, { status: 201 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
