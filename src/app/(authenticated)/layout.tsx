import { Box, rem } from "@mantine/core";
import { Navbar } from "../components/Navbar/Navbar";
// import { redirect } from "next/navigation";
import { getSession } from "../lib/action";

const layout = ({ children }: { children: React.ReactNode }) => {
  const session = getSession();
  console.log(session);
  
  return (
    <>
      <Navbar session={session} />
      <Box flex="1" px="100px" py="xl" ml={rem(300)}>
        {children}
      </Box>
    </>
  );
};

export default layout;
