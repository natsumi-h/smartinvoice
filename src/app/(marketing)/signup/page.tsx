import {
  TextInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Flex,
} from "@mantine/core";
import Link from "next/link";

const page = () => {
  return (
    <Container size={420} my={80} flex={1}>
      <Title ta="center" fw={"bold"}>
        Welcome!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you have an account yet?{" "}
        <Anchor size="sm" component={Link} href="/signin">
          Signin
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="john@smartinvoice.com" required />
        <TextInput label="Name" placeholder="John Doe" required mt="md" />
        <TextInput label="Phone" placeholder="12345678" required mt="md" />
        {/* <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        /> */}
        <Group justify="space-between" mt="lg">
          <Checkbox label="Subscribe SmartInvoice newsletter" />
          <Flex gap={"sm"} align={"center"}>
            <Checkbox />
            <Text fz={"sm"}>
              Agree to{" "}
              <Anchor href="/" component={Link}>
                terms and conditions
              </Anchor>
            </Text>
          </Flex>
          {/* <Anchor component="button" size="sm">
            Forgot password?
          </Anchor> */}
        </Group>
        <Button fullWidth mt="xl">
          Sign up
        </Button>
      </Paper>
    </Container>
  );
};

export default page;
