import UpdateForm from "@/app/components/Customer/UpdateForm";
import { Box, Title } from "@mantine/core";

const getCustomer = async (id: string) => {
  const res = await fetch(`http://localhost:3000//api/customer/${id}`);
  const data = await res.json();
  return data;
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
