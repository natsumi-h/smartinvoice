import CreateNewUser from "@/app/components/Company/CreateNewUser";
import { Box, Title } from "@mantine/core";

const page = () => {
  return (
    <Box>
      <Title order={2}>Invite a new user</Title>
      <CreateNewUser />
    </Box>
  );
};

export default page;
