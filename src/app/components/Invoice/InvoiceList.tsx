"use client";
import { Badge, Skeleton, Table, Text } from "@mantine/core";
import { FC } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { addCommasToNumber } from "@/app/lib/addCommas";
import { Invoice as PrismaInvoice, Customer } from "@prisma/client";

type Invoice = PrismaInvoice & {
  customer: Customer;
};

type Props = {
  invoices: Invoice[];
  loading: boolean;
};

const InvoiceList: FC<Props> = ({ invoices, loading }) => {
  const router = useRouter();

  const rows = invoices.map((invoice) => (
    <Table.Tr
      key={invoice.id}
      style={{
        cursor: "pointer",
      }}
      onClick={() => router.push(`/invoice/${invoice.id}`)}
    >
      <Table.Td pl="0">{invoice.customer.name}</Table.Td>
      <Table.Td pl="0">
        {dayjs(invoice.issueDate).format("DD MMM YYYY")}
      </Table.Td>
      <Table.Td pl="0">{dayjs(invoice.dueDate).format("DD MMM YYYY")}</Table.Td>
      <Table.Td pl="0" pr="md" ta="right">
        ${addCommasToNumber(Number(invoice.totalAmount))}
      </Table.Td>
      <Table.Td pl="0">
        <Badge>{invoice.status}</Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {invoices.length === 0 && !loading ? (
        <Text mt={"xl"}>No invoices found</Text>
      ) : (
        <>
          <Table.ScrollContainer minWidth={500}>
            <Table
              mt={"xl"}
              fz="md"
              verticalSpacing="sm"
              highlightOnHover={true}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th pl="0">Customer</Table.Th>
                  <Table.Th pl="0">Date</Table.Th>
                  <Table.Th pl="0">Due Date</Table.Th>
                  <Table.Th pl="0">Total Amount</Table.Th>
                  <Table.Th pl="0">Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>

          <Skeleton height={15} mt={20} radius="xl" visible={loading} />
          <Skeleton height={15} mt={20} radius="xl" visible={loading} />
          <Skeleton height={15} mt={20} radius="xl" visible={loading} />
        </>
      )}
    </>
  );
};

export default InvoiceList;
