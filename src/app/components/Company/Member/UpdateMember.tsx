"use client";
import { FC, useEffect, useState } from "react";
import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useToast from "@/app/hooks/useToast";
import { useRouter } from "next/navigation";

type Props = {
  opened: boolean;
  close: () => void;
  member: {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "User";
  };
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

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  useEffect(() => {
    form.setValues({
      email: member.email,
      name: member.name,
      role: member.role,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/${member.id}/`, {
        method: "POST",
        body: JSON.stringify({
          ...form.values,
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
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorToast(error as string);
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
          <Button onClick={handleSubmit} loading={loadiing}>
            Update
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default UpdateMember;
