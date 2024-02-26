import { NextResponse } from "next/server";
import { prisma } from "@/app/db";

// GET /api/customer/:id
// @desc: Get a single customer
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const res = await prisma.customer.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        contact: {
          orderBy: [
            { isPrimary: "desc" },
            { name: "asc" },
          ],
        },
      },
    });
    console.log(res);
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// POST /api/customer/:id
// @desc: Update a single customer
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const id = params.id;
    const res = await prisma.customer.update({
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
    console.error(e);
    throw e;
  }
}
