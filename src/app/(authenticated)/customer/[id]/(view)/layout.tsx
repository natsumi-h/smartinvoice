import SingleCustomer from "@/app/components/Customer/SingleCustomer";
import { getCustomer } from "@/app/lib/data";
import { Box, Button, Flex, Text, Title, rem } from "@mantine/core";
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
  const contacts = customer?.contact;
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
        <Button
          variant="outline"
          color="red"
          component={Link}
          href={`/customer/${customer?.id}/update`}
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
        <Text>{address}</Text>
      </Flex>
      <Flex align={"center"} gap="sm">
        <IconMail
          style={{ width: rem(20), height: rem(20) }}
          stroke={1}
          color="var(--mantine-color-blue-5)"
        />
        <Text>
          {customer?.contact.map((contact: any) =>
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
