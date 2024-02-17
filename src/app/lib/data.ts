import { prisma } from "@/app/db";
import { unstable_noStore as noStore } from "next/cache";
import { getSession } from "./action";

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
    const session: any = getSession();
    if (!session || session.payload.role !== "admin") {
      throw new Error("Unauthorized");
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
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getInvoices = async () => {
  noStore();
  try {
    const res = await prisma.invoice.findMany({
      include: {
        customer: true,
        items: true,
      },
    });
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getInvoice = async (id: string) => {
  noStore();
  try {
    const res = await prisma.invoice.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        customer: true,
        items: true,
      },
    });
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
