"use client";
import { Table } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { addCommasToNumber } from "@/app/lib/addCommas";

type Props = {
  invoices: any;
};

const InvoiceList:FC<Props> = ({invoices}) => {
  const router = useRouter();

  const rows = invoices.map((invoice: any) => (
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
        {addCommasToNumber(Number(invoice.totalAmount))}
      </Table.Td>
      <Table.Td pl="0">
        {invoice.status}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table mt={"xl"} fz="md" verticalSpacing="sm" highlightOnHover={true}>
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
  );
};

export default InvoiceList;
