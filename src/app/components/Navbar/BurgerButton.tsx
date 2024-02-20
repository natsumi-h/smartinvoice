"use client";
import { Anchor, Burger, Flex, Text, Title, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import styles from "../../components/Navbar/Navbar.module.css"
import Link from "next/link";

const BurgerButton = () => {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  return (
    <>
      <Flex
        hiddenFrom="md"
        h={"60px"}
        justify={"space-between"}
        align={"center"}
        px={"md"}
        style={{ zIndex: 1000 }}
      >
        <Title order={1} size="h3">
          <Anchor
            href="/invoice"
            component={Link}
            underline="never"
            style={{
              color: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
            }}
          >
            SmartInvoice
          </Anchor>
        </Title>
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
        />
      </Flex>

      {/* Menu */}
      {opened && (
        <Flex
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            width: "100%",
            height: "100%",
            padding: "20px",
          }}
          direction={"column"}
          gap={"lg"}
          className={styles.spMenu}
        >
          <UnstyledButton
            onClick={() => {
              router.push("/invoice");
              toggle();
            }}
          >
            <Text fz={"xl"} fw={"bold"}>
              Invoice
            </Text>
          </UnstyledButton>
          <UnstyledButton
            onClick={() => {
              router.push("/customer");
              toggle();
            }}
          >
            <Text fz={"xl"} fw={"bold"}>
              Customer
            </Text>
          </UnstyledButton>
          <UnstyledButton
            onClick={() => {
              router.push("/company");
              toggle();
            }}
          >
            <Text fz={"xl"} fw={"bold"}>
              My Organization
            </Text>
          </UnstyledButton>
        </Flex>
      )}
    </>
  );
};

export default BurgerButton;
