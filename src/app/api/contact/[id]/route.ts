import { NextResponse } from "next/server";
import { prisma } from "@/app/db";

// POST /api/contact/:id
// @desc: Update a single contact
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const id = params.id;
    const res = await prisma.contact.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...body,
      }
    });
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// DELETE /api/contact/:id
// @desc: Delete a single contact
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const res = await prisma.contact.delete({
      where: {
        id: parseInt(id),
      }
    });
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.error(e);
    throw e;
  }
}


