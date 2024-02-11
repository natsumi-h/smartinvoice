"use client";

import CreateForm from "@/app/components/Invoice/CreateForm";
import { Box, Title } from "@mantine/core";
import React from "react";

const page = () => {
  return (
    <Box>
      <Title order={2}>New Invoice</Title>
      <CreateForm />
    </Box>
  );
};

export default page;
