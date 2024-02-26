"use client";
import useToast from "@/app/hooks/useToast";
import { Button, Group, Modal, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

type Props = {
  invoice: {
    id: number;
    status: string;
  };
};

const UpdateStatus: FC<Props> = ({ invoice }) => {
  const [loadiing, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();
  const statusOptions =
    invoice.status === "Issued" ? ["Issued", "Sent", "Paid"] : ["Sent", "Paid"];
  const form = useForm({
    initialValues: {
      status: invoice.status,
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/invoice/${invoice.id}/updatestatus`, {
        method: "POST",
        body: JSON.stringify({
          status: values.status,
        }),
      });
      const data = await response.json();
      console.log(data);
      form.reset();
      setLoading(false);
      close();
      router.refresh();
      successToast({
        title: "Invoice Status updated",
        message: "Invoice status has been updated successfully",
      });
    } catch (error) {
      setLoading(false);
      //   errorToast("Failed to update member");
    }
  };

  return (
    <>
      <Button variant="outline" onClick={open}>
        Update Status
      </Button>

      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
        title="Update Status"
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Select
            label="Status"
            placeholder="Select one"
            mt="lg"
            data={statusOptions}
            defaultValue="User"
            allowDeselect={false}
            {...form.getInputProps("status")}
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
            <Button loading={loadiing} type="submit">
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default UpdateStatus;
