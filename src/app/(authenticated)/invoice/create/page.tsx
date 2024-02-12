import CreateForm from "@/app/components/Invoice/CreateForm";
import { Box, Title } from "@mantine/core";
import React from "react";

const getCustomers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer`);
  const data = await res.json();
  return data;
};

const page = async () => {
  const customers = await getCustomers();
  return (
    <Box>
      <Title order={2}>New Invoice</Title>
      <CreateForm customers={customers} />
    </Box>
  );
};

export default page;
