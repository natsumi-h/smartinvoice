"use client";
import CreateNewCustomer from "@/app/components/Customer/CreateForm";
import { Box, Title } from "@mantine/core";

const page = () => {
  return (
    <Box>
      <Title order={2}>Create New Customer</Title>
      <CreateNewCustomer/>
    </Box>
  );
};

export default page;
