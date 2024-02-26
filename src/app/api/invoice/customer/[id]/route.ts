import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";
import { JWTPayload, JWTVerifyResult } from "jose";
import { checkIfUserIsLoggedIn } from "@/app/lib/apiMiddleware";

// GET /api/invoice/customer/:id
// @desc: Get all invoices for a single customer
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkIfUserIsLoggedIn();
    const customerId = params.id;
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    const usersCompany = session?.payload.company as number;

    const res = await prisma.invoice.findMany({
      where: {
        customer_id: parseInt(customerId),
        company_id: usersCompany,
      },
      include: {
        company: true,
      },
      orderBy: {
        issueDate: "desc",
      },
    });
    console.log(res);

    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
