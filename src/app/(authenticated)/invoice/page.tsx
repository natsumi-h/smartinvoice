import InvoiceList from "@/app/components/Invoice/InvoiceList";
import { Box, Button, Flex, Title } from "@mantine/core";
import Link from "next/link";
// import { Suspense } from "react";
// import Loading from "./loading";

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

      {/* <Suspense fallback={<Loading />}> */}
      <InvoiceList />
      {/* </Suspense> */}
    </Box>
  );
};

export default page;
