import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";

// GET /api/invoice/customer/:id
// @desc: Get all invoices for a single customer
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = params.id; //6

    const session: any = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }
    const usersCompany = session.payload.company; //5

    const res = await prisma.invoice.findMany({
      where: {
        customer_id: parseInt(customerId),
        company_id: usersCompany,
      },
      include: {
        company: true,
      },
    });
    console.log(res);

    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
