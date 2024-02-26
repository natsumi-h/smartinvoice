import { Group, Text, rem, Anchor } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import Link from "next/link";
import { JWTPayload, JWTVerifyResult } from "jose";
import { FC } from "react";

type Props = {
  session: JWTVerifyResult<JWTPayload> | null;
};

const UserButton: FC<Props> = ({ session }) => {
  const name = session?.payload.name as string;
  const email = session?.payload.email as string;
  return (
    <Anchor
      className={classes.user}
      component={Link}
      href="/account"
      td={"none"}
    >
      <Group>
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </Anchor>
  );
};

export default UserButton;
