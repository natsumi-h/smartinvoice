"use client";
import { FC, useState } from "react";
import {
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useToast from "@/app/hooks/useToast";
import { useRouter } from "next/navigation";

type Props = {
  opened: boolean;
  close: () => void;
  customerId: string;
};

const CreateContact: FC<Props> = ({ opened, close, customerId }) => {
  const [loadiing, setLoading] = useState(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      isPrimary: false,
      title: "Mr.",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleCreate = async () => {
    try {
      setLoading(true);
      const title = form.values.title.replace(/\.$/, "");
      const response = await fetch(`/api/customer/${customerId}/contact`, {
        method: "POST",
        body: JSON.stringify({
          ...form.values,
          title,
        }),
      });

      const data = await response.json();
      form.reset();
      setLoading(false);
      close();
      router.refresh();
      successToast({
        title: "Contact created",
        message: "Contact has been created successfully",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorToast(error as string);
    }
  };

  return (
    <>
      {/* Create */}
      <Modal opened={opened} onClose={close} title="Create Contact">
        <TextInput
          label="Name"
          placeholder="John Doe"
          mt="lg"
          {...form.getInputProps("name")}
        />
        <Select
          label="Title"
          placeholder="Select title"
          mt="lg"
          data={["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."]}
          defaultValue="Mr."
          allowDeselect={false}
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Email"
          placeholder="email@email.com"
          mt="lg"
          {...form.getInputProps("email")}
        />
        <Checkbox
          mt="lg"
          label="Primary contact"
          {...form.getInputProps("isPrimary")}
        />
        <Group mt="xl" justify="center">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={handleCreate} loading={loadiing}>
            Create
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default CreateContact;
