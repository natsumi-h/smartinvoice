import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";
import { generateHtml, generatePdf } from "@/app/lib/pdf";
import { uploadFileToS3 } from "@/app/lib/s3";
import { JWTPayload, JWTVerifyResult } from "jose";
import { InvoiceItem } from "@prisma/client";
import { checkIfUserIsLoggedIn } from "@/app/lib/apiMiddleware";

// POST /api/invoice/:id
// @desc: Update a invoice
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkIfUserIsLoggedIn();
    const id = params.id;
    const req = await request.json();
    const { items: newItems, ...payload } = req.payload;
    delete payload.requestType;

    // Get exisiting invoice items
    const existingItems = await prisma.invoiceItem.findMany({
      where: { invoice_id: parseInt(id) },
    });

    const updatePromises = newItems.map((item: InvoiceItem) => {
      // If item has an id and it exists in the existingItems array, update it
      if (item.id && existingItems.some((ei) => ei.id === item.id)) {
        return prisma.invoiceItem.update({
          where: { id: item.id },
          data: item,
        });
      } else {
        // else create a new item
        return prisma.invoiceItem.create({
          data: { ...item, invoice_id: parseInt(id) },
        });
      }
    });

    // Delete items that are not in the newItems array
    const deletePromises = existingItems
      .filter((ei) => !newItems.some((item: InvoiceItem) => item.id === ei.id))
      .map((item) => prisma.invoiceItem.delete({ where: { id: item.id } }));

    // Wait for all updates and deletes to complete
    await Promise.all([...updatePromises, ...deletePromises]);

    const updateRes = await prisma.invoice.update({
      where: {
        id: parseInt(id),
      },
      data: payload,
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

    if (req.payload.requestType === "draft") {
      return NextResponse.json(
        {
          data: updateRes,
        },
        { status: 200 }
      );
    }

    // Generate PDF
    const html = generateHtml(updateRes);
    const pdfBuffer = await generatePdf(html);
    const contentType = "application/pdf";
    // Upload to S3
    const uniqueInvoiceName = `invoice-${id}.pdf`;
    const fileUrl = await uploadFileToS3(
      pdfBuffer,
      uniqueInvoiceName,
      contentType
    );
    // ORM update
    const updateWithPdfRes = await prisma.invoice.update({
      where: {
        id: parseInt(id),
      },
      data: {
        invoiceUrl: fileUrl,
        status:
          req.payload.requestType === "issue" ? "Issued" : updateRes.status,
      },
      include: {
        items: true,
        customer: {
          include: {
            contact: true,
          },
        },
        company: true,
      },
    });

    return NextResponse.json(
      {
        data: updateWithPdfRes,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
