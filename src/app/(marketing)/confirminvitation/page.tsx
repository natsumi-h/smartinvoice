import {
  Paper,
  Title,
  Container,
  Button,
  PasswordInput,
} from "@mantine/core";

const page = () => {
  return (
    <Container size={420} my={80} flex={1}>
      <Title ta="center" fw={"bold"}>
        Set your password
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Button fullWidth mt="xl">
          Create an account
        </Button>
      </Paper>
    </Container>
  );
};

export default page;
