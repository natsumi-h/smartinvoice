import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";

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

// POST /api/company
// @desc: Create a new company
export async function POST(request: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }
  try {
    const session: any = await getSession();
    const userId = session.payload.id;
    console.log(userId);

    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const contentType = file.type;
    const generateUniqueFileName = (originalFileName: string) => {
      const fileExtension = originalFileName.split(".").pop();
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 15);
      return `file_${timestamp}_${randomString}.${fileExtension}`;
    };
    const uniqueFileName = generateUniqueFileName(file.name);

    // S3へのアップロード処理
    const fileUrl = await uploadFileToS3(buffer, uniqueFileName, contentType);
    console.log(fileUrl);

    const body = {
      name: formData.get("name"),
      uen: formData.get("uen"),
      street: formData.get("street"),
      town: formData.get("town"),
      state: formData.get("state"),
      postcode: formData.get("postcode"),
      phone: formData.get("phone"),
      bankname: formData.get("bankname"),
      branchname: formData.get("branchname"),
      accountname: formData.get("accountname"),
      accounttype: formData.get("accounttype"),
      accountnumber: formData.get("accountnumber"),
      bankcode: formData.get("bankcode"),
      swiftcode: formData.get("swiftcode"),
      branchnumber: formData.get("branchnumber"),
    };

    const name = formData.get("name") as string;
    const uen = formData.get("uen") as string;
    const street = formData.get("street") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const postcode = formData.get("postcode") as string;
    const phone = formData.get("phone") as string;
    const bankname = formData.get("bankname") as string;
    const branchname = formData.get("branchname") as string;
    const accountname = formData.get("accountname") as string;
    const accounttype = formData.get("accounttype") as string;
    const accountnumber = formData.get("accountnumber") as string;
    const bankcode = formData.get("bankcode") as string;
    const swiftcode = formData.get("swiftcode") as string;
    const branchnumber = formData.get("branchnumber") as string;

    //ORM処理
    const res = await prisma.company.create({
      data: {
        name,
        uen,
        street,
        city,
        state,
        postcode,
        phone,
        bankname,
        branchname,
        accountname,
        accounttype,
        accountnumber,
        bankcode,
        swiftcode,
        branchnumber,
        logoUrl: fileUrl,
        user: {
          connect: {
            id: userId,
          },
        },
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
    // TODO:ユーザーのCompany情報を取得する
    const session: any = getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }
    const userId = session.payload.id;
    const res = await prisma.company.findFirst({
      where: {
        user: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
      },
    });
    console.log(res);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
