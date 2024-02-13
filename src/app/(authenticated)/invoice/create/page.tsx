import CreateForm from "@/app/components/Invoice/CreateForm";
import { Box, Title } from "@mantine/core";
import React from "react";

const getCustomers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer`);

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
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
