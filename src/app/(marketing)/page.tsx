import Link from "next/link";
import styles from "./page.module.css";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import HomeHeader from "../components/Navbar/HomeHeader";

export default function Home() {
  return (
    <>
      <Stack h="100vh" px="xl">
        <HomeHeader />
        <Box flex="1">
          <main className={styles.main}>
            <Title order={1} size={rem(70)} className={styles.title}>
              Effortlessly Create &<br></br> Manage your Invoices.
            </Title>
            <Text fz={"lg"} mt={"lg"}>
              Our invoice app is designed to make invoicing simple and
              stress-free.<br></br>As a small business owner, create and manage
              your invoices quickly and easily.
            </Text>
            <Flex gap="md" mt="xl">
              <Button component={Link} href="/signup">
                Signup
              </Button>
              <Button component={Link} href="/" variant="outline">
                Learn more
              </Button>
            </Flex>
          </main>
        </Box>
        {/* <footer>footer</footer> */}
      </Stack>
    </>
  );
}
