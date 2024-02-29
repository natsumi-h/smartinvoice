import Link from "next/link";

import { Title, Text, Button, Container, Group, Anchor } from "@mantine/core";
import classes from "./NotFound.module.css";

export default function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group justify="center">
        <Anchor href="/" component={Link}>
          Take me back to home page
        </Anchor>
      </Group>
    </Container>
  );
}
