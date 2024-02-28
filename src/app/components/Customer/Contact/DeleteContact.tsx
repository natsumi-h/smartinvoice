import useToast from "@/app/hooks/useToast";
import { Button, Group, Modal, Text } from "@mantine/core";
import { Contact } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

type Props = {
  opened: boolean;
  close: () => void;
  contact: Contact;
};

const DeleteContact: FC<Props> = ({ opened, close, contact }) => {
  const [loadiing, setLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/contact/${contact.id}`, {
        method: "POST",
        body: JSON.stringify({
          deleted: true,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }
      setLoading(false);
      close();
      router.refresh();
      successToast({
        title: "Contact deleted",
        message: "Contact has been deleted successfully",
      });
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      errorToast(error.message);
    }
  };
  return (
    <Modal opened={opened} onClose={close} title="Delete Contact">
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

export default DeleteContact;
