import UpdateInvoice from "@/app/components/Invoice/UpdateInvoice";
import { getCustomers, getInvoice } from "@/app/lib/data";
import { Box, Title } from "@mantine/core";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const customers: any = await getCustomers();
  const id = params.id;
  const invoice: any = await getInvoice(id);
  return (
    <Box>
      <Title order={2}>Update Invoice</Title>
      <UpdateInvoice customers={customers} invoice={invoice} />
    </Box>
  );
};

export default page;
