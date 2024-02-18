import {
  Anchor,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { FC, useState } from "react";
import { IconMail } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import styles from "../Customer/CustomerList.module.css";

type Props = {
  company: {
    id: number;
    name: string;
    uen: string;
    street: string;
    postcode: string;
    phone: string;
    logoUrl: string;
    city: string;
    state: string;
    bankname: string;
    branchname: string;
    swiftcode: string;
    accountname: string;
    accounttype: string;
    bankcode: string;
    branchnumber: string;
    accountnumber: string;
    user: {
      id: number;
      name: string;
      email: string;
      signupDone: boolean;
      role: "admin" | "user";
    }[];
  };
};

const Members: FC<Props> = ({ company }) => {
  // const [createOpened, createOpenedHandlers] = useDisclosure(false);
  const [updateOpened, updateOpenedHandlers] = useDisclosure(false);
  const [deleteOpened, deleteOpenedHandlers] = useDisclosure(false);
  const [contact, setContact] = useState<{
    id: string;
    name: string;
    email: string;
    isPrimary: boolean;
    title: string;
  }>({
    id: "",
    name: "",
    email: "",
    isPrimary: false,
    title: "",
  });

  return (
    <>
      <Button variant="outline" component={Link} href="/company/newuser">
        Invite New User
      </Button>
      <ul className={styles.ul}>
        {company.user.map((user) => (
          <li className={styles.li} key={user.id}>
            <Anchor
              component={Link}
              href={`customer/1}`}
              underline="never"
              inherit
              style={{ color: "inherit" }}
            >
              <Flex align={"center"} justify={"space-between"}>
                <Box>
                  <Flex align={"center"} gap="md">
                    <Title order={4}>{user.name}</Title>
                    <Badge variant="filled">{user.role}</Badge>
                    {!user.signupDone && (
                      <Badge variant="filled">Invitation sent</Badge>
                    )}
                  </Flex>

                  <Flex align={"center"} gap="sm" mt="sm">
                    <IconMail
                      style={{ width: rem(20), height: rem(20) }}
                      stroke={1}
                      color="var(--mantine-color-blue-5)"
                    />
                    <Text c="gray.7">{user.email}</Text>
                  </Flex>
                </Box>

                <Flex align={"center"} gap="md">
                  <Button
                    variant={"outline"}
                    onClick={(e) => {
                      e.preventDefault();
                      setContact(contact);
                      updateOpenedHandlers.open();
                    }}
                  >
                    Update
                  </Button>
                  {user.role !== "admin" && (
                    <Button
                      variant={"outline"}
                      color="red"
                      onClick={(e) => {
                        e.preventDefault();
                        setContact(contact);
                        deleteOpenedHandlers.open();
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </Flex>
              </Flex>

              <Divider mt="md" />
            </Anchor>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Members;
