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
  };
};

const Members: FC<Props> = () => {
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
      <Button variant="outline" component={Link} href="/company/newuser">
        Invite New User
      </Button>
      <ul className={styles.ul}>
        <li className={styles.li} key={contact.id}>
          <Anchor
            component={Link}
            href={`customer/1}`}
            underline="never"
            c="black"
          >
            <Flex align={"center"} justify={"space-between"}>
              <Box>
                <Flex align={"center"} gap="md">
                  <Title order={4}>Natsumi Hori</Title>
                    <Badge variant="filled">Admin</Badge>
                </Flex>

                <Flex align={"center"} gap="sm" mt="sm">
                  <IconMail
                    style={{ width: rem(20), height: rem(20) }}
                    stroke={1}
                    color="var(--mantine-color-blue-5)"
                  />
                  <Text c="gray.7">test@test.com</Text>
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
      </ul>

      {/* Create */}
      {/* <CreateContact
        opened={createOpened}
        close={createOpenedHandlers.close}
        customerId={id}
      /> */}

      {/* Update */}
      {/* <UpdateContact
        opened={updateOpened}
        close={updateOpenedHandlers.close}
        contact={contact}
      /> */}

      {/* Delete */}
      {/* <DeleteContact
        opened={deleteOpened}
        close={deleteOpenedHandlers.close}
        contact={contact}
      /> */}
    </>
  );
};

export default Members;
