import { NextResponse } from "next/server";
import { prisma } from "@/app/db";

// POST /api/icustomer
// @desc: Create a new customer
export async function POST(request: Request) {
  try {
    const req = await request.json();
    
    // ORM
    const res = await prisma.customer.create({
      data: {
        name: req.name,
        street: req.street,
        city: req.city,
        state: req.state,
        postcode: req.postcode,
        phone: req.phone,
        contact: {
          create: {
            email: req.email,
            title: req.Title,
            name: req.contactName,
            isPrimary: true,
          },
        },
      },
      include: {
        contact: true,
      },
    });
    console.log(res);
    return NextResponse.json(
      {
        message: "Customer created successfully",
        data: res,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// GET /api/customer
// @desc: Get all customers
export async function GET(request: Request) {
  try {
    const res = await prisma.customer.findMany({
      include: {
        contact: {
          orderBy: [
            { isPrimary: "desc" }, // まず isPrimary で降順に並べる
            { name: "asc" }, // 次に name で昇順に並べる
          ],
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    console.log(res);

    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
