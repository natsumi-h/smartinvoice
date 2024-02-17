import { Group, Text, rem, Anchor } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import Link from "next/link";

export function UserButton({ session }: any) {
  return (
    <Anchor
      className={classes.user}
      component={Link}
      href="/account"
      td={"none"}
    >
      <Group>
        {/* <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
        /> */}

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {session?.payload?.name}
          </Text>

          <Text c="dimmed" size="xs">
            {session?.payload?.email}
          </Text>
        </div>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </Anchor>
  );
}
