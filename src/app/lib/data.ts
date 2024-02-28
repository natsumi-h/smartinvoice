import { prisma } from "@/app/db";
import { unstable_noStore as noStore } from "next/cache";
import { getSession } from "./action";
import { JWTPayload, JWTVerifyResult } from "jose";
import { checkIfUserIsAdmin, checkIfUserIsLoggedIn } from "./apiMiddleware";

export const getCustomers = async () => {
  noStore();
  try {
    await checkIfUserIsLoggedIn();
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
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
    await checkIfUserIsLoggedIn();
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    const res = await prisma.customer.findUnique({
      where: {
        id: parseInt(id),
        deleted: false,
        company_id: session?.payload.company as number,
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
    await checkIfUserIsLoggedIn();
    const res = await prisma.contact.findMany({
      where: {
        customer_id: parseInt(id),
        deleted: false,
      },
      orderBy: [{ isPrimary: "desc" }, { name: "asc" }],
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
    await checkIfUserIsAdmin();
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    const res = await prisma.company.findUnique({
      where: {
        id: session?.payload.company as number,
      },
    });
    return res;
  } catch (e) {
    throw e;
  }
};

export const getMembers = async () => {
  noStore();
  try {
    await checkIfUserIsAdmin();
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    const userCompany = session?.payload.company as number;
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
      orderBy: [
        {
          role: "desc",
        },
        {
          name: "asc",
        },
      ],
    });
    return res;
  } catch (e) {
    throw e;
  }
};

export const getInvoices = async () => {
  noStore();
  try {
    await checkIfUserIsLoggedIn();
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    const usersCompany = session?.payload.company as number;
    const res = await prisma.invoice.findMany({
      where: {
        company_id: usersCompany,
        deleted: false,
      },
      include: {
        customer: true,
        items: true,
      },
      orderBy: {
        issueDate: "desc",
      },
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getInvoice = async (id: string) => {
  noStore();
  try {
    await checkIfUserIsLoggedIn();
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    const usersCompany = session?.payload.company as number;

    const res = await prisma.invoice.findUnique({
      where: {
        id: parseInt(id),
        company_id: usersCompany,
      },
      include: {
        customer: true,
        items: true,
        contact: true,
      },
    });

    return res;
  } catch (e) {
    throw e;
  }
};

export const getUser = async () => {
  noStore();
  try {
    await checkIfUserIsLoggedIn();
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    const res = await prisma.user.findUnique({
      where: {
        id: session?.payload.id as number,
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
    throw e;
  }
};
