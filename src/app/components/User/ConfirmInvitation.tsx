"use client";
import { Paper, Title, Container, Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import useToast from "@/app/hooks/useToast";
import { hashData } from "@/app/lib/security";
import { useSearchParams } from "next/navigation";
import { confirmSignupSchema } from "@/app/schema/User/schema";
import { zodResolver } from "mantine-form-zod-resolver";

const ConfirmInvitation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(confirmSignupSchema),
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
      const response = await fetch(`/api/user/confirminvite?token=${token}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setLoading(false);
      router.push("/signin");
      successToast({
        title: "Signup success",
        message: "You have successfully signed up. Please signin to continue.",
      });
    } catch (error: any) {
      setLoading(false);
      errorToast(error.message);
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

export default ConfirmInvitation;
