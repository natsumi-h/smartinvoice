"use client";
import {
  ActionIcon,
  Button,
  Flex,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import toggleStyles from "./Navbar.module.css";
import Link from "next/link";

const HomeHeader = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  return (
    <header>
      <Flex justify={"space-between"} align={"center"} py={"md"}>
        <Title order={1} size={"h2"}>SmartInvoice</Title>
        <Flex gap={"md"}>
          <Button component={Link} href="/signin">
            Signin
          </Button>
          <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
          >
            <IconSun
              className={cx(toggleStyles.icon, toggleStyles.light)}
              stroke={1.0}
            />
            <IconMoon
              className={cx(toggleStyles.icon, toggleStyles.dark)}
              stroke={1.0}
            />
          </ActionIcon>
        </Flex>
      </Flex>
    </header>
  );
};

export default HomeHeader;
