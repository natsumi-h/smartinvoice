import CustomerList from "@/app/components/Customer/CustomerList";
import { Box, Button, Flex, Title } from "@mantine/core";
import Link from "next/link";

const page = () => {
  return (
    <Box maw="800px">
      <Flex justify={"space-between"} align="center">
        <Title order={2}>Customers</Title>
        <Button
          color="blue"
          variant="outline"
          component={Link}
          href="/customer/create"
        >
          Create New
        </Button>
      </Flex>

      <CustomerList />
    </Box>
  );
};

export default page;
