import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";

// POST /api/customer
// @desc: Create a new customer
export async function POST(request: Request) {
  try {
    const session: any = await getSession();
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const userId = session.payload.id;
    const userCompany = session.payload.company;

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
            title: req.title,
            name: req.contactName,
            isPrimary: true,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        company: {
          connect: {
            id: userCompany,
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
export async function GET(request: NextRequest) {
  const session: any = await getSession();
  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
  const usersCompany = session.payload.company;
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  console.log(query);


  try {
    const whereCondition = {
      AND: [
        {
          company: {
            id: usersCompany,
          },
          deleted: false,
        },
        {
          OR: [
            {
              name: query
                ? {
                    contains: query,
                  }
                : undefined,
            },
            {
              phone: query
                ? {
                    contains: query,
                  }
                : undefined,
            },
            {
              postcode: query
                ? {
                    contains: query,
                  }
                : undefined,
            },
            {
              street: query
                ? {
                    contains: query,
                  }
                : undefined,
            },
            {
              city: query
                ? {
                    contains: query,
                  }
                : undefined,
            },
            {
              state: query
                ? {
                    contains: query,
                  }
                : undefined,
            },
            {
              contact: query
                ? {
                    some: {
                      name: {
                        contains: query,
                      },
                      email: {
                        contains: query,
                      },
                    },
                  }
                : undefined,
            },
          ].filter(Boolean),
        },
      ],
    };

    const res = await prisma.customer.findMany({
      where: whereCondition,
      include: {
        contact: {
          orderBy: [{ isPrimary: "desc" }, { name: "asc" }],
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
