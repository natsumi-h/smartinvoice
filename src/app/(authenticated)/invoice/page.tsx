import InvoiceView from "@/app/components/Invoice/InvoiceView";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { getCustomers, getInvoices } from "@/app/lib/data";
import { Box, Button, Flex, Title } from "@mantine/core";
import Link from "next/link";
import { Suspense } from "react";

const page = async () => {
  const invoices = await getInvoices();
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
      <Suspense fallback={<LoadingSpinner />}>
        <InvoiceView invoices={invoices} customers={customers} />
      </Suspense>
    </Box>
  );
};

export default page;
