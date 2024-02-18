"use client";
import useToast from "@/app/hooks/useToast";
import { createNewUserSchema } from "@/app/schema/Company/schema";
import { Box, Button, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateNewUser = () => {
  const [loading, setLoading] = useState(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();

  const form = useForm({
    validate: zodResolver(createNewUserSchema),
    initialValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const role = values.role.toLowerCase();
    try {
      const response = await fetch("/api/user/invite", {
        method: "POST",
        body: JSON.stringify({ ...values, role }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      router.push("/company/member");
      router.refresh();
      setLoading(false);
      successToast({
        title: "Invitation sent",
        message: "User will receive an email to verify their account shortly.",
      });
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      errorToast(error.message);
    }
  };

  return (
    <Box maw="800px">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Name"
          placeholder="John Roe"
          mt="lg"
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Email"
          placeholder="user@smartinvoice.com"
          mt="lg"
          {...form.getInputProps("email")}
        />
        <Select
          label="Role"
          placeholder="Pick one"
          mt="lg"
          data={["Admin", "User"]}
          {...form.getInputProps("role")}
        />

        <Group justify="center" mt="xl">
          <Button fullWidth type="submit" loading={loading}>
            Send invitation
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default CreateNewUser;
