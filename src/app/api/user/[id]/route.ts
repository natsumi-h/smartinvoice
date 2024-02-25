import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";

// POST /api/user/:id
// @desc: Update a single contact
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session: any = await getSession();
  if (!session || !session.payload.role) {
    return NextResponse.json(new Error("Unauthorized"), { status: 401 });
  }

  try {
    const body = await request.json();
    const id = params.id;
    const res = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...body,
        deletedAt: body.deleted ? new Date() : null,
      },
    });
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// DELETE /api/user/:id
// @desc: Delete a single contact
// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session: any = await getSession();
//     if (!session || !session.payload.role) {
//       return NextResponse.json(new Error("Unauthorized"), { status: 401 });
//     }
//     const id = params.id;
//     const res = await prisma.user.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });
//     return NextResponse.json(res, { status: 200 });
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
// }
