"use client";
import { Badge, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { addCommasToNumber } from "@/app/lib/addCommas";
import { Invoice } from "@prisma/client";

const CustomerInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const router = useRouter();
  const customerId = useParams<{ id: string }>();

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await fetch(`/api/invoice/customer/${customerId.id}`);
      const data = await res.json();
      setInvoices(data);
    };
    fetchInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = invoices.map((invoice: Invoice) => (
    <Table.Tr
      key={invoice.id}
      style={{
        cursor: "pointer",
      }}
      onClick={() => router.push(`/invoice/${invoice.id}`)}
    >
      <Table.Td pl="0">
        {dayjs(invoice.issueDate).format("DD MMM YYYY")}
      </Table.Td>
      <Table.Td pl="0">{dayjs(invoice.dueDate).format("DD MMM YYYY")}</Table.Td>
      <Table.Td pl="0" ta="right">
        ${addCommasToNumber(Number(invoice.totalAmount))}
      </Table.Td>
      <Table.Td pl="0">
        <Badge>{invoice.status}</Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table mt={"lg"} fz="md" verticalSpacing="sm" highlightOnHover={true}>
        <Table.Thead>
          <Table.Tr>
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

export default CustomerInvoice;
