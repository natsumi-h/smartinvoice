"use client";
import {
  ActionIcon,
  Box,
  Group,
  ScrollArea,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { LinksGroup } from "../NavbarLinksGroup/NavbarLinksGroup";
// import { Logo } from "./Logo";
import classes from "./Navbar.module.css";
import { UserButton } from "../UserButton/UserButton";
import cx from "clsx";

const mockdata = [
  {
    label: "Invoice",
    icon: IconNotes,
    InfinityOpened: false,
    links: [
      { label: "Invoice list", link: "/invoice/" },
      { label: "Create new", link: "/invoice/create" },
    ],
  },
  {
    label: "Customers",
    icon: IconGauge,
    initiallyOpened: false,
    links: [
      { label: "List", link: "/customer" },
      { label: "Create new", link: "/customer/create" },
    ],
  },
  {
    label: "My Team",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [{ label: "My Team Detail", link: "/company" }],
  },
  // { label: "Analytics", icon: IconPresentationAnalytics },
  // { label: "Contracts", icon: IconFileAnalytics },
  // { label: "Settings", icon: IconAdjustments },
  // {
  //   label: "Security",
  //   icon: IconLock,
  //   links: [
  //     { label: "Enable 2FA", link: "/" },
  //     { label: "Change password", link: "/" },
  //     { label: "Recovery codes", link: "/" },
  //   ],
  // },
];

export function Navbar() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Title order={1} size="h3">
            SmartInvoice
          </Title>
          {/* <Logo style={{ width: rem(120) }} /> */}
          {/* <Code fw={700}>v3.1.2</Code> */}
          <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
          >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.0} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.0} />
          </ActionIcon>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
