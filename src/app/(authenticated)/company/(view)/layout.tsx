import CompanyView from "@/app/components/Company/CompanyView";
import { Title } from "@mantine/core";

const getCustomer = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.data;
};

const page = async () => {
  const data = await getCustomer();
  return (
    <>
      <Title order={2}>My Team</Title>
      <CompanyView company={data} />
    </>
  );
};

export default page;
