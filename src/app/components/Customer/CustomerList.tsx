"use client"
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
  useEffect(() => {
    getCustomers();
  }, []);
  const [customers, setCustomers] = useState([]);
  const getCustomers = async () => {
    const res = await fetch("/api/customer");
    const data = await res.json();
    setCustomers(data);
  };

  return (
    <>
      <TextInput
        mt="lg"
        placeholder="Search customers..."
        leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} />}
      />
      <ul className={styles.ul}>
        {customers.map((customer: Customer) => (
          <li key={customer.id} className={styles.li}>
            <Anchor
              component={Link}
              href={`/customer/${customer.id}/`}
              underline="never"
              // c="black"
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
                <Text c="gray.7">
                  {customer.street}, {customer.city}, {customer.postcode}
                </Text>
              </Flex>
              <Flex align={"center"} gap="sm">
                <IconMail
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1}
                  color="var(--mantine-color-blue-5)"
                />
                <Text c="gray.7">
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
