"use client";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import useToast from "@/app/hooks/useToast";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  id: string;
};

const DeleteInvoice: FC<Props> = ({ id }) => {
  const [loadiing, setLoading] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/invoice/${id}/delete`, {
        method: "POST",
        body: JSON.stringify({
          deleted: true,
        }),
      });
      const data = await response.json();
      setLoading(false);
      close();
      router.push("/invoice");
      router.refresh();
      successToast({
        title: "Invoice deleted",
        message: "Invoice has been deleted successfully",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorToast(error as string);
    }
  };

  return (
    <>
      <Button variant="outline" color="red" onClick={open}>
        Delete
      </Button>

      <Modal opened={opened} onClose={close} title="Delete Invoice">
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
    </>
  );
};

export default DeleteInvoice;
