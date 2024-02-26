import UpdateCustomer from "@/app/components/Customer/UpdateCustomer";
import { getCustomer } from "@/app/lib/data";
import { Box, Title } from "@mantine/core";
import { Customer } from "@prisma/client";

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
      <UpdateCustomer customer={customer as Customer} />
    </Box>
  );
};

export default page;
