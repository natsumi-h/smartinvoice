import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/app/db";
import puppeteer from "puppeteer";
import { getSession } from "@/app/lib/action";
import { generateHtml } from "@/app/lib/pdf";

// HTMLを生成（CSSをインラインで組み込む）
// const html = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Invoice</title>
//   <style>
//   body {
//   font-family: Arial, sans-serif;
//   margin: 0;
//   padding: 0;
// }

// header, footer {
//   background-color: #f2f2f2;
//   padding: 10px;
// }

// table {
//   width: 100%;
//   border-collapse: collapse;
// }

// th, td {
//   border: 1px solid #ddd;
//   padding: 8px;
// }

// th {
//   text-align: left;
// }

// tfoot {
//   font-weight: bold;
// }
//   </style>
// </head>
// <body>
//   <header>
//     <h1>Invoice</h1>
//     <p>Invoice number: 123456</p>
//     <p>Date: February 12, 2024</p>
//   </header>

//   <main>
//     <table>
//       <thead>
//         <tr>
//           <th>Description</th>
//           <th>Quantity</th>
//           <th>Unit Price</th>
//           <th>Total</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>Item 1</td>
//           <td>2</td>
//           <td>$10.00</td>
//           <td>$20.00</td>
//         </tr>
//         <!-- More items here -->
//       </tbody>
//     </table>
//   </main>

//   <footer>
//     <p>Total: $20.00</p>
//     <p>Payment due by: February 28, 2024</p>
//   </footer>
// </body>
// </html>
//     `;

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

    // ORM
    const createRes = await prisma.invoice.create({
      data: {
        // invoiceUrl: fileUrl,
        customer: {
          connect: {
            id: payload.customer,
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
    // TODO:Invoice name
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
