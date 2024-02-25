"use client";
import {
  Anchor,
  Divider,
  Flex,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { IconMail, IconMapPin, IconSearch } from "@tabler/icons-react";
import styles from "./CustomerList.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";

type Customer = {
  id: string;
  name: string;
  street: string;
  city: string;
  postcode: string;
  contact: {
    email: string;
    isPrimary: boolean;
  }[];
};

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm({
    initialValues: {
      queryParam: null,
    },
    validate: {
      queryParam: (value: string) =>
        value.length > 2 || value.length === 0
          ? null
          : "Search query must be at least 3 characters",
    },
  });

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { queryParam } = form.values;
      const query = queryParam
        ? `?query=${encodeURIComponent(queryParam)}`
        : "";
      const res = await fetch(`/api/customer${query}`);
      const data = await res.json();
      setCustomers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    await fetchCustomers();
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit())}>
        <TextInput
          mt="lg"
          placeholder="Search customers..."
          leftSection={
            <IconSearch style={{ width: rem(18), height: rem(18) }} />
          }
          disabled={loading}
          {...form.getInputProps("queryParam")}
        />
      </form>
      <ul className={styles.ul}>
        {customers.map((customer: Customer) => (
          <li key={customer.id} className={styles.li}>
            <Anchor
              component={Link}
              href={`/customer/${customer.id}/`}
              underline="never"
              inherit
              style={{ color: "inherit" }}
            >
              <Title order={3}>{customer.name}</Title>
              <Flex align={"center"} gap="sm" mt="xs">
                <IconMapPin
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1}
                  color="var(--mantine-color-blue-5)"
                />
                <Text>
                  {customer.street}, {customer.city}, {customer.postcode}
                </Text>
              </Flex>
              <Flex align={"center"} gap="sm">
                <IconMail
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1}
                  color="var(--mantine-color-blue-5)"
                />
                <Text>
                  {
                    (
                      customer?.contact?.find(
                        (contact: any) => contact.isPrimary === true
                      ) || {}
                    ).email
                  }
                </Text>
              </Flex>
              <Divider mt="md" />
            </Anchor>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CustomerList;
