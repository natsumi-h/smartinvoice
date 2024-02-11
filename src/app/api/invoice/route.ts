import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/app/db";
import puppeteer from "puppeteer";

const s3Client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: "AKIA47CRYBUVGJPXG6FH",
    secretAccessKey: "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",
  },
});

const uploadFileToS3 = async (
  file: Buffer,
  fileName: string,
  contentType: string
) => {
  const fileBuffer = file;
  try {
    const params = {
      Bucket: "smartinvoice-gacapstone",
      Key: fileName,
      Body: fileBuffer,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const fileUrl = `https://smartinvoice-gacapstone.s3.ap-southeast-2.amazonaws.com/${encodeURIComponent(
      fileName
    )}`;
    return fileUrl;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const generatePdf = async (html: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf(); // PDFのBufferを取得
  await browser.close();
  return pdfBuffer;
};

// POST /api/invoice
// @desc: Create a new invoice
export async function POST(request: Request) {
  try {
    // req.bodyの処理
    // const formData = await request.formData();
    // console.log(formData);
    // const html = formData.get("html") as string;
    // console.log(html);
    const req = await request.json();
    const html = req.html;
    const payload = req.payload;
    // PDFを生成
    const pdfBuffer = await generatePdf(html);
    const contentType = "application/pdf";
    // S3へのアップロード処理
    // TODO:Invoice name
    const fileUrl = await uploadFileToS3(pdfBuffer, "invoice.pdf", contentType);
    console.log(fileUrl);

    // ORM
    const res = await prisma.invoice.create({
      data: {
        invoiceUrl: fileUrl,
        // customer: payload.customer,
        issueDate: payload.issueDate,
        dueDate: payload.dueDate,
        items: {
          create: payload.items,
        },
        subtotal: payload.subtotal,
        discount: payload.specialDiscount,
        totalTax: payload.totalTax,
        totalAmount: payload.total,
      },
      include: {
        items: true,
      },
    });
    console.log(res);

    return NextResponse.json(
      {
        message: "File upload Success",
        data: res,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
