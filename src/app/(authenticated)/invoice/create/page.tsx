import CreateForm from "@/app/components/Invoice/CreateForm";
import { getCustomers } from "@/app/lib/data";
import { Box, Title } from "@mantine/core";
import React from "react";

const page = async () => {
  const customers: any = await getCustomers();
  return (
    <Box>
      <Title order={2}>New Invoice</Title>
      <CreateForm customers={customers} />
    </Box>
  );
};

export default page;
