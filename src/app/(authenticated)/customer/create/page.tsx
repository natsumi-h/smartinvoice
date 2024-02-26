"use client";
import CreateCustomer from "@/app/components/Customer/CreateCustomer";
import { Box, Title } from "@mantine/core";

const page = () => {
  return (
    <Box>
      <Title order={2}>Create New Customer</Title>
      <CreateCustomer/>
    </Box>
  );
};

export default page;
