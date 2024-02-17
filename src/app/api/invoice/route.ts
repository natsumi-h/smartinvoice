import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/app/db";
import puppeteer from "puppeteer-core";
// import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import { getSession } from "@/app/lib/action";
import { generateHtml } from "@/app/lib/pdf";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION || "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || "",
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
      Bucket: process.env.AWS_S3_BUCKET_NAME,
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
  // const browser = await puppeteer.launch({ headless: true });

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  // const browser = await puppeteer.connect({
  //   browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`,
  // });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf();
  await browser.close();
  return pdfBuffer;
};

// POST /api/invoice
// @desc: Create a new invoice
export async function POST(request: Request) {
  const session: any = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }
  const userId = session.payload.id;
  const usersCompany = await prisma.company.findFirst({
    where: {
      user: {
        some: {
          id: userId,
        },
      },
    },
  });

  if (!usersCompany) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  try {
    const req = await request.json();
    const payload = req.payload;
    // PDFを生成
    // const html = req.html;
    const customer = await prisma.customer.findUnique({
      where: {
        id: payload.customer,
      },
      include: {
        contact: true,
      },
    });
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // ORM
    const createRes = await prisma.invoice.create({
      data: {
        // invoiceUrl: fileUrl,
        customer: {
          connect: {
            id: customer.id,
          },
        },
        issueDate: payload.issueDate,
        dueDate: payload.dueDate,
        items: {
          create: payload.items,
        },
        subtotal: payload.subtotal,
        discount: payload.specialDiscount,
        totalTax: payload.totalTax,
        totalAmount: payload.total,
        user: {
          connect: {
            id: userId,
          },
        },
        company: {
          connect: {
            id: usersCompany.id,
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
      },
    });
    console.log(createRes);
    const html = generateHtml(createRes);
    const pdfBuffer = await generatePdf(html);
    const contentType = "application/pdf";
    // S3へのアップロード処理
    const uniqueInvoiceName = `invoice-${createRes.id}.pdf`;
    const fileUrl = await uploadFileToS3(
      pdfBuffer,
      uniqueInvoiceName,
      contentType
    );
    console.log(fileUrl);

    const updateRes = await prisma.invoice.update({
      where: {
        id: createRes.id,
      },
      data: {
        invoiceUrl: fileUrl,
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
        data: updateRes,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}

// GET /api/invoice
// @desc: Get all invoices
export async function GET(request: Request) {
  const session: any = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }
  const userId = session.payload.id;
  const usersCompany = await prisma.company.findFirst({
    where: {
      user: {
        some: {
          id: userId,
        },
      },
    },
  });
  if (!usersCompany) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  try {
    const res = await prisma.invoice.findMany({
      where: {
        company_id: usersCompany.id,
      },
      include: {
        customer: true,
        items: true,
      },
    });
    console.log(res);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
