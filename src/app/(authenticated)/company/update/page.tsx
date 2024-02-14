"use client";
import FormComponent from "@/app/components/Company/Onboarding";
import { Box, Title } from "@mantine/core";

const page = () => {
  return (
    <Box>
      <Title order={2}>Update your organization detail.</Title>
      <FormComponent />
    </Box>
  );
};

export default page;
