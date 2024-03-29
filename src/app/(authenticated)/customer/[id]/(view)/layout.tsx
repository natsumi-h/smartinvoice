import DeleteCustomer from "@/app/components/Customer/DeleteCustomer";
import SingleCustomer from "@/app/components/Customer/SingleCustomer";
import { getContacts, getCustomer } from "@/app/lib/data";
import { Box, Button, Flex, Text, Title, rem } from "@mantine/core";
import { Contact } from "@prisma/client";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import Link from "next/link";

const Layout = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const customer = await getCustomer(id);
  const address = `${customer?.street}, ${customer?.city}, ${customer?.state}, ${customer?.postcode}`;
  const contacts = await getContacts(id);
  return (
    <Box>
      <Flex gap="md">
        <Title order={2}>{customer?.name}</Title>
        <Button
          variant="outline"
          component={Link}
          href={`/customer/${customer?.id}/update`}
        >
          Update
        </Button>
        {customer?.invoices.length === 0 && <DeleteCustomer id={id} />}
      </Flex>

      <Flex align={"center"} gap="sm" mt="xs">
        <IconMapPin
          style={{ width: rem(20), height: rem(20) }}
          stroke={1}
          color="var(--mantine-color-blue-5)"
        />
        <Text>{address}</Text>
      </Flex>
      <Flex align={"center"} gap="sm">
        <IconMail
          style={{ width: rem(20), height: rem(20) }}
          stroke={1}
          color="var(--mantine-color-blue-5)"
        />
        <Text>
          {customer?.contact.map((contact: Contact) =>
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
        <Text>{customer?.phone}</Text>
      </Flex>
      {/* {children} */}
      <SingleCustomer contacts={contacts as any} id={customer?.id as any} />
    </Box>
  );
};

export default Layout;
