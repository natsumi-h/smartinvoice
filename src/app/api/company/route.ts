import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/app/db";


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

export async function POST(request: Request) {
  try {
    // req.bodyの処理
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const contentType = file.type;
    // S3へのアップロード処理
    const fileUrl = await uploadFileToS3(buffer, file.name, contentType);
    console.log(fileUrl);

    // ここでORM処理
    const res = await prisma.company.create({
      data: {
        name: "name",
        street: "street",
        city: "city",
        state: "state",
        postcode: "postcode",
        phone: "phone",
        bankDetails: "bankDetails",
        invoiceRemark: "invoiceRemarks",
        logoUrl: fileUrl,
      },
    });
    console.log(res);

    return NextResponse.json(
      { message: "File upload Success", data: res },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    // ここでORM処理
    const res = await prisma.company.findMany();
    console.log(res);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
