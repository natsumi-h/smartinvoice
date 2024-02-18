import { Box } from "@mantine/core";
import { Navbar } from "../components/Navbar/Navbar";
// import { redirect } from "next/navigation";
import { getSession } from "../lib/action";
import styles from "../components/Navbar/Navbar.module.css";
import BurgerButton from "../components/Navbar/BurgerButton";

const layout = ({ children }: { children: React.ReactNode }) => {
  const session = getSession();
  return (
    <Box style={{ position: "relative" }}>
      <Navbar session={session} />
      <BurgerButton />
      <Box
        // px="100px"
        // py="xl"
        // ml={rem(300)}
        // mih={"100vh"}
        className={styles.content}
      >
        {children}
      </Box>
    </Box>
  );
};

export default layout;
