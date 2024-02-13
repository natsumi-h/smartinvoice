import CompanyView from "@/app/components/Company/CompanyView";

const getCustomer = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company`);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data.data;
  } catch (e) {
    console.log(e);
  }
};

const page = async () => {
  const data = await getCustomer();
  return <CompanyView company={data} />;
};

export default page;
