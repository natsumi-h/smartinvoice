import { prisma } from "@/app/db";
import { unstable_noStore as noStore } from "next/cache";

export const getCustomers = async () => {
  noStore();
  try {
    const res = await prisma.customer.findMany({
      include: {
        contact: {
          orderBy: [
            { isPrimary: "desc" }, // まず isPrimary で降順に並べる
            { name: "asc" }, // 次に name で昇順に並べる
          ],
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getCustomer = async (id: string) => {
  noStore();
  console.log(id);
  try {
    const res = await prisma.customer.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        contact: {
          orderBy: [{ isPrimary: "desc" }, { name: "asc" }],
        },
      },
    });
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getCompany = async () => {
  noStore();
  try {
    // ここでORM処理
    // TODO:ユーザーのCompany情報を取得する
    const res = await prisma.company.findUnique({
      where: {
        id: 4,
      },
    });
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
