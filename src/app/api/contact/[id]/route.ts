import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { checkIfUserIsLoggedIn } from "@/app/lib/apiMiddleware";
import { createContactSchema } from "@/app/schema/Customer/Contact/schema";
import { ZodError } from "zod";

// POST /api/contact/:id
// @desc: Update single contact
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkIfUserIsLoggedIn();
    const body = await request.json();
    let parsedBody;
    if (!body.deleted) {
      parsedBody = createContactSchema.parse(body);
    } else {
      parsedBody = body;
    }
    const id = params.id;
    const res = await prisma.contact.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...parsedBody,
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
    console.log(e);
    if (e instanceof ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    const message = e.message || "Internal server error";
    const status = e.status || 500;
    return NextResponse.json({ error: message }, { status });
  }
}
