"use client";
import useToast from "@/app/hooks/useToast";
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
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      agreewithtnc: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    // valuesからagreewithtncを削除
    delete values.agreewithtnc;
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(values);
      setLoading(false);
      // router.push("/");
      form.reset();
      successToast({
        title: "Signup request sent",
        message: "You will receive an email to verify your account shortly.",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Container size={420} py={80} flex={1}>
      <Title ta="center" fw={"bold"}>
        Signup to SmartInvoice
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you have an account yet?{" "}
        <Anchor size="sm" component={Link} href="/signin">
          Signin
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            label="Name"
            placeholder="John Doe"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="john@smartinvoice.com"
            mt="md"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Phone"
            placeholder="12345678"
            mt="md"
            {...form.getInputProps("phone")}
          />

          <Group justify="space-between" mt="lg">
            <Checkbox label="Subscribe SmartInvoice newsletter" />
            <Flex gap={"sm"} align={"center"}>
              <Checkbox {...form.getInputProps("agreewithtnc")} />
              <Text fz={"sm"}>
                Agree to{" "}
                <Anchor href="/" component={Link} fz={"sm"}>
                  terms and conditions
                </Anchor>
              </Text>
            </Flex>
          </Group>
          <Button fullWidth mt="xl" loading={loading} type="submit">
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupForm;
