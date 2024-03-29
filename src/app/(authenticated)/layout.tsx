import { Box } from "@mantine/core";
import { getSession } from "../lib/action";
import styles from "../components/Navbar/Navbar.module.css";
import BurgerButton from "../components/Navbar/BurgerButton";
import Navbar from "../components/Navbar/Navbar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  return (
    <Box style={{ position: "relative" }}>
      <Navbar session={session} />
      <BurgerButton />
      <Box
        className={styles.content}
      >
        {children}
      </Box>
    </Box>
  );
};

export default layout;
