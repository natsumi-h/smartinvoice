"use client"
import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useToast from "@/app/hooks/useToast";
import { createCustomerSchema } from "@/app/schema/Customer/schema";

const CreateCustomer = () => {
  const [opened, { close, open }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: "",
      street: "",
      city: "",
      state: "",
      postcode: "",
      phone: "",
      contactName: "",
      title: "",
      email: "",
    },
    validate: zodResolver(createCustomerSchema),
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/customer", {
        method: "POST",
        body: JSON.stringify({
          ...form.values,
          title: form.values.title.replace(/\.$/, ""),
        }),
      });
      const data = await response.json();
      close();
      setLoading(false);
      router.push("/customer");
      router.refresh();
      successToast({
        title: "Customer created",
        message: "Customer has been created successfully",
      });
    } catch (error: any) {
      setLoading(false);
      errorToast(error.message || "Failed to create customer");
    }
  };

  return (
    <>
      <Box maw="800px">
        <form onSubmit={form.onSubmit(open)}>
          <TextInput
            label="Business name"
            placeholder="A business or person's name"
            mt="lg"
            {...form.getInputProps("name")}
          />
          {/* Address */}
          <TextInput
            label="Address"
            placeholder="Street address"
            mt="lg"
            {...form.getInputProps("street")}
          />
          <TextInput
            placeholder="Town/City"
            mt="lg"
            {...form.getInputProps("city")}
          />
          <Flex gap="md" mt="lg">
            <TextInput
              placeholder="State/Region"
              w="50%"
              {...form.getInputProps("state")}
            />
            <TextInput
              placeholder="Postal code"
              w="50%"
              {...form.getInputProps("postcode")}
            />
          </Flex>
          {/* Address */}

          {/* Phone */}
          <TextInput
            label="Phone"
            placeholder="Phone"
            mt="lg"
            {...form.getInputProps("phone")}
          />

          {/* Primary Person */}
          <Text fw={500} size="sm" mt="lg">
            Primary Contact
          </Text>
          <Flex gap="lg">
            <TextInput
              placeholder="Name"
              flex={1}
              {...form.getInputProps("contactName")}
            />
            <Select
              placeholder="Select title"
              data={["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."]}
              allowDeselect={false}
              {...form.getInputProps("title")}
            />
          </Flex>

          <TextInput
            placeholder="Email"
            mt="lg"
            {...form.getInputProps("email")}
          />

          <Group justify="center" mt="xl">
            <Button fullWidth type="submit">
              Create
            </Button>
          </Group>
        </form>
      </Box>

      <Modal
        opened={opened}
        onClose={close}
        size="md"
        title="Create new customer"
      >
        <Text>Are you sure you want to proceed?</Text>
        <Group mt="xl" justify="center">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            Proceed
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default CreateCustomer;
