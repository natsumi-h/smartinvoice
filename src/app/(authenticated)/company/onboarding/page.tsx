"use client";
import FormComponent from "@/app/components/Company/FormComponent";
import { Box, Title } from "@mantine/core";

const page = () => {
  return (
    <Box>
      <Title order={2}>Register your organization detail.</Title>
      <FormComponent />
    </Box>
  );
};

export default page;
