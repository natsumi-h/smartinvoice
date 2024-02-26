import { prisma } from "@/app/db";
import { unstable_noStore as noStore } from "next/cache";
import { getSession } from "./action";
import { JWTPayload, JWTVerifyResult } from "jose";

export const getCustomers = async () => {
  noStore();
  const session: JWTVerifyResult<JWTPayload> | null = await getSession();
  try {
    const res = await prisma.customer.findMany({
      where: {
        deleted: false,
        company_id: session?.payload.company as number,
      },
      include: {
        contact: {
          orderBy: [{ isPrimary: "desc" }, { name: "asc" }],
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getCustomer = async (id: string) => {
  noStore();
  try {
    const res = await prisma.customer.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        contact: {
          orderBy: [{ isPrimary: "desc" }, { name: "asc" }],
        },
        invoices: {
          orderBy: {
            issueDate: "desc",
          },
        },
      },
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getContacts = async (id: string) => {
  noStore();
  try {
    const res = await prisma.contact.findMany({
      where: {
        customer_id: parseInt(id),
        deleted: false,
      },
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getCompany = async () => {
  noStore();
  try {
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    if (!session || session.payload.role !== "Admin") {
      throw new Error("Unauthorized");
    }
    const userId = session.payload.id as number;
    const res = await prisma.company.findFirst({
      where: {
        user: {
          some: {
            id: userId,
          },
        },
      },
    });
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getMembers = async () => {
  noStore();
  try {
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    if (!session || session.payload.role !== "Admin") {
      throw new Error("Unauthorized");
    }
    const userCompany = session.payload.company as number;
    const res = await prisma.user.findMany({
      where: {
        company: {
          id: userCompany,
        },
        deleted: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        signupDone: true,
      },
    });
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getInvoice = async (id: string) => {
  noStore();
  try {
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }
    const usersCompany = session.payload.company as number;

    const res = await prisma.invoice.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        customer: true,
        items: true,
        contact: true,
      },
    });

    if (res?.company_id !== usersCompany) {
      throw new Error("Unauthorized");
    }
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getUser = async () => {
  noStore();
  try {
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }
    const res = await prisma.user.findUnique({
      where: {
        id: session.payload.id as number,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        company: {
          select: {
            name: true,
          },
        },
      },
    });
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
