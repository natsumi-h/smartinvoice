import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { checkIfUserIsLoggedIn } from "@/app/lib/apiMiddleware";
import { createContactSchema } from "@/app/schema/Customer/Contact/schema";

// POST /api/customer/:id/contact
// @desc: Create a new contact for a customer
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkIfUserIsLoggedIn();
    const body = await request.json();
    const parsedBody = createContactSchema.parse(body);
    const id = params.id;
    const res = await prisma.contact.create({
      data: {
        ...parsedBody,
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
