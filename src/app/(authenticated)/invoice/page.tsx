import InvoiceView from "@/app/components/Invoice/InvoiceView";
import { getCustomers, getInvoices } from "@/app/lib/data";
import { Box, Button, Flex, Title } from "@mantine/core";
import Link from "next/link";

const page = async () => {
  // const invoices = await getInvoices();
  const customers = await getCustomers();

  return (
    <Box>
      <Flex justify={"space-between"} align="center">
        <Title order={2}>Invoice</Title>
        <Button
          color="blue"
          variant="outline"
          component={Link}
          href="/invoice/create"
        >
          Create New
        </Button>
      </Flex>
      <InvoiceView
      // invoices={invoices}
      customers={customers}
      />
    </Box>
  );
};

export default page;
