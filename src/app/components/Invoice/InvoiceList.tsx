"use client";
import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await fetch("/api/invoice");
      const data = await res.json();
      setInvoices(data.data);
    };
    fetchInvoices();
  }, []);

  const rows = invoices.map((invoice: any) => (
    <Table.Tr
      key={invoice.id}
      style={{
        cursor: "pointer",
      }}
      onClick={() => router.push(`/invoice/${invoice.id}`)}
    >
      <Table.Td>{invoice.customer.name}</Table.Td>
      <Table.Td>{dayjs(invoice.issueDate).format("DD MMM YYYY")}</Table.Td>
      <Table.Td>{dayjs(invoice.dueDate).format("DD MMM YYYY")}</Table.Td>
      <Table.Td>{Number(invoice.totalAmount).toFixed(2)}</Table.Td>
      <Table.Td>{invoice.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt="lg" fz="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Customer</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Due Date</Table.Th>
          <Table.Th>Total Amount</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default InvoiceList;
