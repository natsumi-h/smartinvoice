import { Box, rem } from "@mantine/core";
import { Navbar } from "../components/Navbar/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Box flex="1" px="100px" py="xl" ml={rem(300)}>
        {children}
      </Box>
    </>
  );
};

export default layout;
