"use client";
import {
  ActionIcon,
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
import classes from "./Navbar.module.css";
import { UserButton } from "../UserButton/UserButton";
import cx from "clsx";

export function Navbar({ session }: any) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  console.log(session.payload.role);

  const mockdata =
    session.payload.role === "admin"
      ? [
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
              { label: "Customer List", link: "/customer" },
              { label: "Create new", link: "/customer/create" },
            ],
          },
          {
            label: "My Organization",
            icon: IconCalendarStats,
            initiallyOpened: false,
            links: [{ label: "My Organization Detail", link: "/company" }],
          },
        ]
      : [
          {
            label: "Invoice",
            icon: IconNotes,
            initiallyOpened: false,
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
        ];

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
        <UserButton session={session} />
      </div>
    </nav>
  );
}
