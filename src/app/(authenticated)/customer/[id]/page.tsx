import SingleCustomer from "@/app/components/Customer/SingleCustomer";
import { Box, Button, Flex, Text, Title, rem } from "@mantine/core";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import Link from "next/link";

const getCustomer = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/${id}/`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default async function Page ({
  params,
}: {
  params: {
    id: string;
  };
})  {
  const { id } = params;
  const customer = await getCustomer(id);
  const address = `${customer.street}, ${customer.city}, ${customer.state}, ${customer.postcode}`;
  const contacts = customer.contact;

  return (
    <Box>
      <Flex gap="md">
        <Title order={2}>{customer.name}</Title>
        <Button
          variant="outline"
          component={Link}
          href={`/customer/${customer.id}/update`}
        >
          Update
        </Button>
        <Button
          variant="outline"
          color="red"
          component={Link}
          href={`/customer/${customer.id}/update`}
        >
          Delete
        </Button>
      </Flex>

      <Flex align={"center"} gap="sm" mt="xs">
        <IconMapPin
          style={{ width: rem(20), height: rem(20) }}
          stroke={1}
          color="var(--mantine-color-blue-5)"
        />
        <Text c="gray.7">{address}</Text>
      </Flex>
      <Flex align={"center"} gap="sm">
        <IconMail
          style={{ width: rem(20), height: rem(20) }}
          stroke={1}
          color="var(--mantine-color-blue-5)"
        />
        <Text c="gray.7">
          {customer.contact.map((contact: any) =>
            contact.isPrimary ? contact.email : ""
          )}
        </Text>
      </Flex>
      <Flex align={"center"} gap="sm">
        <IconPhone
          style={{ width: rem(20), height: rem(20) }}
          stroke={1}
          color="var(--mantine-color-blue-5)"
        />
        <Text c="gray.7">{customer.phone}</Text>
      </Flex>
      {/* {children} */}
      <SingleCustomer contacts={contacts} id={customer.id} />
    </Box>
  );
};
