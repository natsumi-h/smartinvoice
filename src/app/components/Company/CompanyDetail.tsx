import { Box, Button, Table, Image } from "@mantine/core";
import { Company } from "@prisma/client";
import NextImage from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  company: Company;
};

const CompanyDetail: FC<Props> = ({ company }) => {
  const {
    name,
    uen,
    street,
    city,
    state,
    postcode,
    phone,
    logoUrl,
    bankname,
    branchname,
    accountname,
    accounttype,
    bankcode,
    swiftcode,
    branchnumber,
    accountnumber,
  } = company;

  const address = `${street}, ${city}, ${state} ${postcode}`;
  const bankDetails = `Bank: ${bankname}, Branch: ${branchname}, A/C Name: ${accountname}, A/C Type: ${accounttype}, A/C #: ${accountnumber}, Bank Code: ${bankcode}, SWIFT BIC Code: ${swiftcode}, Branch: ${branchnumber}`;
  return (
    <>
      <Button variant="outline" component={Link} href="/company/update">
        Update
      </Button>
      <Table mt="lg" withRowBorders={false} fz={"lg"}>
        <Table.Tbody>
          {/* Logo */}
          <Table.Tr>
            <Table.Th pl="0">Company Logo</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">
              <Box
                w="200px"
                h="100px"
                style={{
                  position: "relative",
                }}
              >
                <Image fill component={NextImage} src={logoUrl} alt={name} />
              </Box>
            </Table.Td>
          </Table.Tr>
          {/* Name */}
          <Table.Tr>
            <Table.Th pl="0">Name</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">{name}</Table.Td>
          </Table.Tr>
          {/* Address */}
          <Table.Tr>
            <Table.Th pl="0">Address</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">{address}</Table.Td>
          </Table.Tr>
          {/* Phone */}
          <Table.Tr>
            <Table.Th pl="0">Phone</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">{phone}</Table.Td>
          </Table.Tr>
          {/* UEN */}
          <Table.Tr>
            <Table.Th pl="0">UEN</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">{uen}</Table.Td>
          </Table.Tr>
          {/* Bank account detail */}
          <Table.Tr>
            <Table.Th pl="0">Bank Account Detail</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td pl="0">{bankDetails}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
};

export default CompanyDetail;
