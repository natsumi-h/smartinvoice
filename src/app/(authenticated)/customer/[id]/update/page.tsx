import UpdateForm from "@/app/components/Customer/UpdateForm";
import { Box, Title } from "@mantine/core";

const getCustomer = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/${id}`
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const customer = await getCustomer(id);

  return (
    <Box>
      <Title order={2}>Update Customer</Title>
      <UpdateForm customer={customer} />
    </Box>
  );
};

export default page;
