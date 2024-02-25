import Onboarding from "@/app/components/Company/Onboarding";
import { Box, Title } from "@mantine/core";

const page = () => {
  return (
    <Box mx={"auto"} maw={"800px"} p={"lg"}>
      <Title order={2}>Register your organization detail.</Title>
      <Onboarding />
    </Box>
  );
};

export default page;
