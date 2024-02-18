"use client";
import { Paper, Title, Container, Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import useToast from "@/app/hooks/useToast";
import { hashData } from "@/app/lib/security";
import { useSearchParams } from "next/navigation";

const ConfirmSignup = () => {
  const [loading, setLoading] = useState(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match.",
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    const password = form.values.password;
    const hash = hashData(password);
    const payload = {
      password: hash.hash,
      salt: hash.salt,
      iterations: hash.iterations,
    };

    try {
      const response = await fetch(`/api/user/confirmsignup?token=${token}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      router.push("/signin");
      successToast({
        title: "Signup success",
        message: "You have successfully signed up. Please signin to continue.",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    // TODO:Suspense
    <Suspense>
      <Container size={420} py={80} flex={1}>
        <Title ta="center" fw={"bold"}>
          Set your password
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(() => handleSubmit())}>
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("confirmPassword")}
            />
            <Button fullWidth mt="xl" type="submit" loading={loading}>
              Create an account
            </Button>
          </form>
        </Paper>
      </Container>
    </Suspense>
  );
};

export default ConfirmSignup;
