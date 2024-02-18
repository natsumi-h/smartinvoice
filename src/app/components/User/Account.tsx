"use client";
import { Box, Button, Table } from "@mantine/core";
import { useRouter } from "next/navigation";
import useToast from "@/app/hooks/useToast";
import { useState } from "react";

const Account = ({ session, user }: any) => {
  const { successToast, errorToast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const email = session.payload.email;
      const res = await fetch("/api/user/signout", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        throw new Error("Error");
      }
      //   removeSession();
      setLoading(false);
      router.push("/signin");
      successToast({
        title: "Signout successful",
        message: "You are now signed out.",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Table mt="lg" withRowBorders={false} fz={"lg"}>
        <Table.Tbody>
          {/* Name */}
          <Table.Tr>
            <Table.Th pl="0">Name</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">{user.name}</Table.Td>
          </Table.Tr>
          {/* Email */}
          <Table.Tr>
            <Table.Th pl="0">Email</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">{user.email}</Table.Td>
          </Table.Tr>
          {/* Phone */}
          <Table.Tr>
            <Table.Th pl="0">Phone</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">{user.phone}</Table.Td>
          </Table.Tr>
          {/* Password */}
          <Table.Tr>
            <Table.Th pl="0">Password</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">***********</Table.Td>
          </Table.Tr>
          {/* Role */}
          <Table.Tr>
            <Table.Th pl="0">Role</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">
              {user.role === "admin" ? "Admin" : "User"}
            </Table.Td>
          </Table.Tr>
          {/* Org */}
          <Table.Tr>
            <Table.Th pl="0">Organization</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">{user.company.name}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <Box mt="lg">
        <Button onClick={handleLogout} loading={loading}>
          Logout
        </Button>
      </Box>
    </>
  );
};

export default Account;
