import InvoiceView from "@/app/components/Invoice/InvoiceView";
import { Box, Button, Flex, Title } from "@mantine/core";
import Link from "next/link";
import { Suspense } from "react";
import Skelton from "@/app/components/Skelton";

const page = () => {
  return (
    <Box maw="800px">
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

      <Suspense fallback={<Skelton />}>
        <InvoiceView />
      </Suspense>
    </Box>
  );
};

export default page;
