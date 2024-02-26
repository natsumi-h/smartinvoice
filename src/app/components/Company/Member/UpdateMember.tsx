"use client";
import { FC, useEffect, useState } from "react";
import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import useToast from "@/app/hooks/useToast";
import { useRouter } from "next/navigation";
import { createNewUserSchema } from "@/app/schema/Company/schema";
import { User } from "@prisma/client";

type Props = {
  opened: boolean;
  close: () => void;
  member: User;
};

const UpdateMember: FC<Props> = ({ opened, close, member }) => {
  const [loadiing, setLoading] = useState(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: member.email,
      name: member.name,
      role: member.role,
    },
    validate: zodResolver(createNewUserSchema),
  });

  useEffect(() => {
    form.setValues({
      email: member.email,
      name: member.name,
      role: member.role,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/${member.id}/`, {
        method: "POST",
        body: JSON.stringify({
          ...values,
        }),
      });
      const data = await response.json();
      form.reset();
      setLoading(false);
      close();
      router.refresh();
      successToast({
        title: "Member updated",
        message: "Member has been updated successfully",
      });
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      errorToast(error.message);
    }
  };

  return (
      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
        title="Update Member"
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="lg"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="email@email.com"
            mt="lg"
            {...form.getInputProps("email")}
          />
          <Select
            label="Role"
            placeholder="Select role"
            mt="lg"
            data={["Admin", "User"]}
            defaultValue="User"
            allowDeselect={false}
            {...form.getInputProps("role")}
          />

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
  );
};

export default UpdateMember;
