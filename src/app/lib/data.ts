import { prisma } from "@/app/db";
export const getCustomer = async (id: string) => {
  console.log(id);
  try {
    const res = await prisma.customer.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        contact: {
          orderBy: [
            { isPrimary: "desc" },
            { name: "asc" },
          ],
        },
      },
    });
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }

  //   try {
  //     const res = await fetch(
  //       `https://smartinvoice-dev.vercel.app/api/customer/${id}/`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(res); // ここでレスポンスをログに出力
  //     if (!res.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const data = await res.json();
  //     console.log(data);
  //     return data;
  //   } catch (e) {
  //     console.log(e);
  //   }
};
