"use client";
import useToast from "@/app/hooks/useToast";
import { updateCustomerSchema } from "@/app/schema/Customer/schema";
import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Customer } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

type Props = {
  customer: Customer;
};

const UpdateCustomer: FC<Props> = ({ customer }) => {
  const { id, name, street, city, state, postcode, phone } = customer;

  const [opened, { close, open }] = useDisclosure(false);
  const [loadiing, setLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: name,
      street: street,
      city: city,
      state: state,
      postcode: postcode,
      phone: phone,
    },
    validate: zodResolver(updateCustomerSchema),
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/customer/${id}`, {
        method: "POST",
        body: JSON.stringify({
          ...form.values,
        }),
      });
      const data = await response.json();
      close();
      setLoading(false);
      router.push(`/customer/${id}`);
      router.refresh();
      successToast({
        title: "Customer updated",
        message: "Customer has been updated successfully",
      });
    } catch (error: any) {
      setLoading(false);
      errorToast(error.message || "Failed to update customer");
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

          <Group justify="center" mt="xl">
            <Button fullWidth type="submit">
              Update
            </Button>
          </Group>
        </form>
      </Box>

      <Modal opened={opened} onClose={close} size="md" title="Update customer">
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

export default UpdateCustomer;
