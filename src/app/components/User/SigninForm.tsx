"use client";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useToast from "@/app/hooks/useToast";
import { hashDataWithSaltRounds } from "@/app/lib/security";

const SigninForm = () => {
  const form = useForm({});
  const [loading, setLoading] = useState(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const encodedEmail = encodeURIComponent(values.email);
      const response = await fetch(`/api/user/signin?email=${encodedEmail}`, {
        method: "GET",
      });
      const data = await response.json();
      const hashedPassword = hashDataWithSaltRounds(
        values.password,
        data.salt,
        data.iterations
      );
      const payload = {
        email: values.email,
        password: hashedPassword,
      };
      const signinRes = await fetch("/api/user/signin", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!signinRes.ok) {
        throw new Error("Invalid credentials");
      }
      const signinData = await signinRes.json();
      console.log(signinData.company);

      setLoading(false);
      if (signinData.company) {
        router.push("/invoice");
      } else {
        router.push("/company/onboarding");
      }
      successToast({
        title: "Signin successful",
        message: "You are now signed in.",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={80} flex={1}>
      <Title ta="center" fw={"bold"}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component={Link} href="/signup">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            label="Email"
            placeholder="john@smartinvoice"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          {/* <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group> */}
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SigninForm;
