import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";
import { generateHtml, generatePdf } from "@/app/lib/pdf";
import { uploadFileToS3 } from "@/app/lib/s3";
import { JWTPayload, JWTVerifyResult } from "jose";
import { InvoiceItem } from "@prisma/client";
import { checkIfUserIsLoggedIn } from "@/app/lib/apiMiddleware";

// POST /api/invoice
// @desc: Create a new invoice
export async function POST(request: Request) {
  await checkIfUserIsLoggedIn();
  const session: JWTVerifyResult<JWTPayload> | null = await getSession();
  const userId = session?.payload.id as number;
  const usersCompany = session?.payload.company as number;

  try {
    const req = await request.json();
    const payload = req.payload;
    // ORM
    const createRes = await prisma.invoice.create({
      data: {
        customer: {
          connect: {
            id: parseInt(payload.customer),
          },
        },
        contact: {
          connect: {
            id: parseInt(payload.contact),
          },
        },
        issueDate: payload.issueDate,
        dueDate: payload.dueDate,
        items: {
          create: payload.items.map((item: InvoiceItem) => {
            return {
              description: item.description,
              qty: item.qty,
              unitPrice: item.unitPrice,
              // taxRate: parseInt(item.taxRate),
              taxRate : item.taxRate,
              amount: (
                item.qty *
                Number(item.unitPrice) *
                (item.taxRate === 9 ? 1.09 : 1)
              ).toFixed(2),
            };
          }),
        },
        subtotal: payload.subtotal,
        discount: payload.discount,
        totalTax: payload.totalTax,
        totalAmount: payload.total,
        user: {
          connect: {
            id: userId,
          },
        },
        company: {
          connect: {
            id: usersCompany,
          },
        },
      },
      include: {
        items: true,
        customer: {
          include: {
            contact: true,
          },
        },
        company: true,
        contact: true,
      },
    });

    if (payload.requestType === "draft") {
      return NextResponse.json(
        {
          data: createRes,
        },
        { status: 200 }
      );
    }

    // Generate PDf
    const html = generateHtml(createRes);
    const pdfBuffer = await generatePdf(html);
    const contentType = "application/pdf";
    // Upload to S#
    const uniqueInvoiceName = `invoice-${createRes.id}.pdf`;
    const fileUrl = await uploadFileToS3(
      pdfBuffer,
      uniqueInvoiceName,
      contentType
    );
    // ORM update
    const updateRes = await prisma.invoice.update({
      where: {
        id: createRes.id,
      },
      data: {
        invoiceUrl: fileUrl,
        status: "Issued",
      },
      include: {
        items: true,
        customer: {
          include: {
            contact: true,
          },
        },
        company: true,
        contact: true,
      },
    });

    return NextResponse.json(
      {
        data: updateRes,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}

// GET /api/invoice
// @desc: Get all invoices
export async function GET(request: NextRequest) {
  const session: JWTVerifyResult<JWTPayload> | null = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }
  const usersCompany = session.payload.company as number;

  const searchParams = request.nextUrl.searchParams;
  const customerParam = searchParams.get("customer");
  const statusParam = searchParams.get("status");
  const issueDateStartParam = searchParams.get("issueDateStart");
  const issueDateEndParam = searchParams.get("issueDateEnd");
  const dueDateStartParam = searchParams.get("dueDateStart");
  const dueDateEndParam = searchParams.get("dueDateEnd");

  try {
    const whereCondition = {
      company_id: usersCompany,
      deleted: false,
      ...(statusParam && {
        status: statusParam as "Draft" | "Sent" | "Paid" | "Issued",
      }),
      ...(customerParam && { customer_id: parseInt(customerParam) }),
      ...(issueDateStartParam &&
        issueDateEndParam && {
          issueDate: {
            gte: new Date(issueDateStartParam),
            lte: new Date(issueDateEndParam),
          },
        }),
      ...(dueDateStartParam &&
        dueDateEndParam && {
          dueDate: {
            gte: new Date(dueDateStartParam),
            lte: new Date(dueDateEndParam),
          },
        }),
    };
    const res = await prisma.invoice.findMany({
      where: whereCondition,
      include: {
        customer: true,
        items: true,
      },
      orderBy: {
        issueDate: "desc",
      },
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
