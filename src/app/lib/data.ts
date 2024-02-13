export const getCustomer = async (id: string) => {
  try {
    const res = await fetch(
      `https://smartinvoice-dev.vercel.app//api/customer/${id}/`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
