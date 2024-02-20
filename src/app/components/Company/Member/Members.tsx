import {
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
import styles from "../../Customer/CustomerList.module.css";
import UpdateMember from "./UpdateMember";
import DeleteMember from "./DeleteMember";

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
      role: "Admin" | "User";
    }[];
  };
};

const Members: FC<Props> = ({ company }) => {
  const [updateOpened, updateOpenedHandlers] = useDisclosure(false);
  const [deleteOpened, deleteOpenedHandlers] = useDisclosure(false);
  const [member, setMember] = useState<{
    id: number;
    name: string;
    email: string;
    role: "Admin" | "User";
    signupDone: boolean;
  }>({
    id: 0,
    name: "",
    email: "",
    role: "User",
    signupDone: false,
  });

  return (
    <>
      <Button variant="outline" component={Link} href="/company/newuser">
        Invite New User
      </Button>
      <ul className={styles.ul}>
        {company.user.map((user) => (
          <li className={styles.li} key={user.id}>
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
                  <Text>{user.email}</Text>
                </Flex>
              </Box>

              <Flex align={"center"} gap="md">
                <Button
                  variant={"outline"}
                  onClick={(e) => {
                    e.preventDefault();
                    setMember(user);
                    updateOpenedHandlers.open();
                  }}
                >
                  Update
                </Button>
                {user.role !== "Admin" && (
                  <Button
                    variant={"outline"}
                    color="red"
                    onClick={(e) => {
                      e.preventDefault();
                      setMember(user);
                      deleteOpenedHandlers.open();
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Flex>
            </Flex>

            <Divider mt="md" />
          </li>
        ))}
      </ul>

      {/* Update */}
      <UpdateMember
        opened={updateOpened}
        close={updateOpenedHandlers.close}
        member={member}
      />

      {/* Delete */}
      <DeleteMember
        opened={deleteOpened}
        close={deleteOpenedHandlers.close}
        member={member}
      />
    </>
  );
};

export default Members;
