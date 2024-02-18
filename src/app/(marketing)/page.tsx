import Link from "next/link";
import styles from "./page.module.css";
import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import HomeHeader from "../components/Navbar/HomeHeader";
import NextImage from "next/image";

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
            <Flex
              justify={"space-between"}
              align={"self-start"}
              mt="xl"
              maw={"1200px"}
              className={styles.flex}
            >
              <Flex gap="md">
                <Button component={Link} href="/signup">
                  Signup
                </Button>
                <Button component={Link} href="/" variant="outline">
                  Learn more
                </Button>
              </Flex>
              <Box

                className={styles.imagebox}
              >
                <Image
                  src="/images/kv.png"
                  component={NextImage}
                  alt="invoice"
                  fill
                />
              </Box>
            </Flex>
          </main>
        </Box>
        {/* <footer>footer</footer> */}
      </Stack>
    </>
  );
}
