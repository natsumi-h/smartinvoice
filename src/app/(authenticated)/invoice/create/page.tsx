import CreateInvoice from "@/app/components/Invoice/CreateInvoice";
import { getCustomers } from "@/app/lib/data";
import { Box, Title } from "@mantine/core";

const page = async () => {
  const customers: any = await getCustomers();
  
  return (
    <Box>
      <Title order={2}>New Invoice</Title>
      <CreateInvoice customers={customers} />
    </Box>
  );
};

export default page;
