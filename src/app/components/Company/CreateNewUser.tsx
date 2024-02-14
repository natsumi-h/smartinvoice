"use client"
import {
  Box,
  Button,
  Group,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const CreateNewUser = () => {
  const form = useForm({
  });

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    // テキストフィールドの値を追加
    Object.keys(values).forEach((key) => {
      if (key !== "file") {
        formData.append(key, values[key]);
      }
      if (key === "accounttype") {
        formData.append(key, values[key].toLowerCase());
      }
    });

    try {
      const response = await fetch("/api/company", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maw="800px">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Name"
          placeholder="Custom layout"
          mt="lg"
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Email"
          placeholder="Custom layout"
          mt="lg"
          {...form.getInputProps("uen")}
        />
        <Select
          label="Role"
          placeholder="Custom layout"
          mt="lg"
          data={["Admin", "User"]}
          {...form.getInputProps("accounttype")}
        />

        <Group justify="center" mt="xl">
          <Button fullWidth type="submit">
            Send invitation
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default CreateNewUser;
