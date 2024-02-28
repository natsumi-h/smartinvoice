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
import { useForm, zodResolver } from "@mantine/form";
import useToast from "@/app/hooks/useToast";
import { useRouter } from "next/navigation";
import { createContactSchema } from "@/app/schema/Customer/Contact/schema";

type Props = {
  opened: boolean;
  close: () => void;
  customerId: string;
};

const CreateContact: FC<Props> = ({ opened, close, customerId }) => {
  const [loadiing, setLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: null,
      name: null,
      isPrimary: false,
      title: null,
    },
    validate: zodResolver(createContactSchema),
  });

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      setLoading(true);
      const valuesTitle = values.title as string;
      const title = valuesTitle.replace(/\.$/, "");
      const response = await fetch(`/api/customer/${customerId}/contact`, {
        method: "POST",
        body: JSON.stringify({
          ...values,
          title,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create contact");
      }
      form.reset();
      setLoading(false);
      close();
      router.refresh();
      successToast({
        title: "Contact created",
        message: "Contact has been created successfully",
      });
    } catch (error: any) {
      setLoading(false);
      errorToast(error.message);
    }
  };

  return (
    <>
      {/* Create */}
      <Modal opened={opened} onClose={close} title="Create Contact">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
            data={[
              {
                value: "Mr",
                label: "Mr.",
              },
              {
                value: "Mrs",
                label: "Mrs.",
              },
              {
                value: "Ms",
                label: "Ms.",
              },
              {
                value: "Dr",
                label: "Dr.",
              },
              {
                value: "Prof",
                label: "Prof.",
              },
            ]}
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
            <Button type="submit" loading={loadiing}>
              Create
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default CreateContact;
