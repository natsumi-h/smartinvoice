"use client";
import { FC, useEffect, useState } from "react";
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
  contact: {
    id: string;
    name: string;
    email: string;
    isPrimary: boolean;
    title: string;
  };
};

const UpdateContact: FC<Props> = ({ opened, close, contact }) => {
  const [loadiing, setLoading] = useState(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();
  const title = `${contact.title}.`;

  const form = useForm({
    initialValues: {
      email: contact.email,
      name: contact.name,
      isPrimary: contact.isPrimary,
      title: title,
    },
    validate: zodResolver(createContactSchema),
  });

  useEffect(() => {
    form.setValues({
      email: contact.email,
      name: contact.name,
      isPrimary: contact.isPrimary,
      title: title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      setLoading(true);
      const valuesTitle = values.title as string;
      const title = valuesTitle.replace(/\.$/, "");
      const response = await fetch(`/api/contact/${contact.id}/`, {
        method: "POST",
        body: JSON.stringify({
          ...values,
          title,
        }),
      });
      const data = await response.json();
      form.reset();
      setLoading(false);
      close();
      router.refresh();
      successToast({
        title: "Contact updated",
        message: "Contact has been updated successfully",
      });
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      errorToast(error.message);
    }
  };

  return (
    <>
      {/* Update */}
      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
        title="Update Contact"
      >
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
          {!contact.isPrimary && (
            <Checkbox
              mt="lg"
              label="Primary contact"
              {...form.getInputProps("isPrimary")}
            />
          )}
          <Group mt="xl" justify="center">
            <Button
              variant="outline"
              onClick={() => {
                close();
                form.reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" loading={loadiing}>
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default UpdateContact;
