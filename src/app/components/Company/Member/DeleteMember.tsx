import useToast from "@/app/hooks/useToast";
import { Button, Group, Modal, Text } from "@mantine/core";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

type Props = {
  opened: boolean;
  close: () => void;
  member: User;
};

const DeleteMember: FC<Props> = ({ opened, close, member }) => {
  const [loadiing, setLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/${member.id}/`, {
        method: "POST",
        body: JSON.stringify({ deleted: true }),
      });
      const data = await response.json();

      setLoading(false);
      close();
      router.refresh();
      successToast({
        title: "Member deleted",
        message: "Member has been deleted successfully",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorToast(error as string);
    }
  };
  return (
    <Modal opened={opened} onClose={close} title="Delete Member">
      <Text>Are you sure you want to proceed?</Text>
      <Group mt="xl" justify="center">
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} loading={loadiing} color="red">
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteMember;
