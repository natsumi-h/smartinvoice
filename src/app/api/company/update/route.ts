import { NextResponse } from "next/server";
import { prisma } from "@/app/db";
import { getSession } from "@/app/lib/action";
import { uploadFileToS3 } from "@/app/lib/s3";

// POST /api/company/update
// @desc: Update a company
export async function POST(request: Request) {
  try {
    const session: any = await getSession();
    if (!session || session.payload.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }
    const usersCompany = session.payload.company;

    const formData = await request.formData();
    const file = formData.get("file") as File;

    let fileUrl;
    if (file) {
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
      fileUrl = await uploadFileToS3(buffer, uniqueFileName, contentType);
      console.log(fileUrl);
    }

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
    const accounttype = formData.get("accounttype") as "Savings" | "Current";
    const accountnumber = formData.get("accountnumber") as string;
    const bankcode = formData.get("bankcode") as string;
    const swiftcode = formData.get("swiftcode") as string;
    const branchnumber = formData.get("branchnumber") as string;

    const dataWithoutFile = {
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
      logoUrl: fileUrl ? fileUrl : undefined,
    };
    const dataWithFile = {
      ...dataWithoutFile,
      logoUrl: fileUrl,
    };

    //ORM処理
    const res = await prisma.company.update({
      where: { id: usersCompany },
      data: file ? dataWithFile : dataWithoutFile,
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
