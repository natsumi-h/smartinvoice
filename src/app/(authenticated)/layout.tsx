"use client";
import { Box, Flex, rem } from "@mantine/core";
import { Navbar } from "../components/Navbar/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Flex direction="row" mih="100vh"> */}
      <Navbar />
      <Box flex="1" px="100px" py="xl" ml={rem(300)}>
        {children}
      </Box>
      {/* </Flex> */}
    </>
  );
};

export default layout;
