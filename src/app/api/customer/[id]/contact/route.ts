import { NextResponse } from "next/server";
import { prisma } from "@/app/db";

// POST /api/customer/:id/contact
// @desc: Create a new contact for a customer
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const id = params.id;

    const res = await prisma.contact.create({
      data: {
        ...body,
        customer_id: parseInt(id),
      },
    });

    // もしbody.isPrimaryがtrueで、プライマリコンタクトが存在する場合、primary.isPrimaryをfalseにする
    if (body.isPrimary) {
      // 同じカスタマーのコンタクトから、プライマリコンタクトを取得
      const primary = await prisma.contact.findFirst({
        where: {
          customer_id: parseInt(id),
          isPrimary: true,
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
  } catch (e) {
    console.error(e);
    throw e;
  }
}
