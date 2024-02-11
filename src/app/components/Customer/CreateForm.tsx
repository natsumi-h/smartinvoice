import useToast from "@/app/hooks/useToast";
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
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateForm = () => {
  const [opened, { close, open }] = useDisclosure(false);
  const [loadiing, setLoading] = useState(false);
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
      title: "Mr.",
      email: "",
    },
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
      console.log(data);
      successToast({
        title: "Customer created",
        message: "Customer has been created successfully",
      });
      close();
      setLoading(false);
      router.push("/customer");
      router.refresh();
    } catch (error) {
      console.log(error);
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
              defaultValue="Mr."
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
          <Button onClick={handleSubmit} loading={loadiing}>
            Proceed
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default CreateForm;
