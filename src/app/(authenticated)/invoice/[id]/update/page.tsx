import UpdateInvoice from "@/app/components/Invoice/UpdateInvoice";
import { getCustomers, getInvoice } from "@/app/lib/data";
import { Box, Title } from "@mantine/core";
import { Contact, Customer, Invoice, InvoiceItem } from "@prisma/client";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const customers = await getCustomers();
  const id = params.id;
  const invoice = await getInvoice(id);
  return (
    <Box>
      <Title order={2}>Update Invoice</Title>
      <UpdateInvoice
        invoice={
          invoice as Invoice & {
            customer: Customer;
            items: InvoiceItem[];
            contact: Contact;
          }
        }
      />
    </Box>
  );
};

export default page;
