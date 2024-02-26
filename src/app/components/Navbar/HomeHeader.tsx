"use client";
import {
  ActionIcon,
  Button,
  Flex,
  Image,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import toggleStyles from "./Navbar.module.css";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import NextImage from "next/image";

const HomeHeader = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  return (
    <header>
      <Flex justify={"space-between"} align={"center"} py={"md"}>
        <Flex gap="xs" align={"center"}>
          <Image
            src={logo}
            component={NextImage}
            alt="smartinvoice"
            w={30}
            h={30}
          />
          <Title order={1} size={"h2"}>
            SmartInvoice
          </Title>
        </Flex>

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
