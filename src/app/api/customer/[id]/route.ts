import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { checkIfUserIsLoggedIn } from "@/app/lib/apiMiddleware";

// GET /api/customer/:id
// @desc: Get a single customer
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkIfUserIsLoggedIn();
    const id = params.id;
    const res = await prisma.customer.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        contact: {
          orderBy: [{ isPrimary: "desc" }, { name: "asc" }],
        },
      },
    });
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
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
    await checkIfUserIsLoggedIn();
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
  } catch (e: any) {
    const message = e.message || "Failed to update customer";
    const status = e.status || 500;
    return NextResponse.json({ message }, { status });
  }
}
