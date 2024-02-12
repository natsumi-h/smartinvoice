"use client";
import Link from "next/link";
import styles from "../CustomerList.module.css";
import { FC, useState } from "react";
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
import { IconMail } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import CreateContact from "./CreateContact";
import UpdateContact from "./UpdateContact";
import DeleteContact from "./DeleteContact";

type Props = {
  id: string;
  contacts: {
    id: string;
    name: string;
    email: string;
    isPrimary: boolean;
    title: string;
  }[];
};

const Contact: FC<Props> = ({ contacts, id }) => {
  const [createOpened, createOpenedHandlers] = useDisclosure(false);
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
      <Button
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          createOpenedHandlers.open();
        }}
      >
        Create New
      </Button>
      <ul className={styles.ul}>
        {contacts.map((contact) => (
          <>
            <li className={styles.li} key={contact.id}>
              <Anchor
                component={Link}
                href={`customer/${id}`}
                underline="never"
                c="black"
              >
                <Flex align={"center"} justify={"space-between"}>
                  <Box>
                    <Flex align={"center"} gap="md">
                      <Title order={4}>{contact.name}</Title>
                      {contact.isPrimary && (
                        <Badge variant="filled">Primary Contact</Badge>
                      )}
                    </Flex>

                    <Flex align={"center"} gap="sm" mt="sm">
                      <IconMail
                        style={{ width: rem(20), height: rem(20) }}
                        stroke={1}
                        color="var(--mantine-color-blue-5)"
                      />
                      <Text c="gray.7">{contact.email}</Text>
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
                    {!contact.isPrimary && (
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
          </>
        ))}
      </ul>

      {/* Create */}
      <CreateContact
        opened={createOpened}
        close={createOpenedHandlers.close}
        customerId={id}
      />

      {/* Update */}
      <UpdateContact
        opened={updateOpened}
        close={updateOpenedHandlers.close}
        contact={contact}
      />

      {/* Delete */}
      <DeleteContact
        opened={deleteOpened}
        close={deleteOpenedHandlers.close}
        contact={contact}
      />
    </>
  );
};

export default Contact;
