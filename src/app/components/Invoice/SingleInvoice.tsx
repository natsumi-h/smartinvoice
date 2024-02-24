"use client";
import { Box, Flex, Table, Text } from "@mantine/core";
import { FC } from "react";
import dayjs from "dayjs";
import { addCommasToNumber } from "@/app/lib/addCommas";

type Props = {
  invoice: any;
};

const SingleInvoice: FC<Props> = ({ invoice }) => {
  const items = invoice.items;
  const customer = invoice.customer;
  const contact = invoice.contact;
  const address = `${customer?.street}, ${customer?.city}, ${customer?.state}, ${customer?.postcode}`;

  // Item
  const rows = items.map((item: any) => (
    <Table.Tr key={item.id}>
      <Table.Td pl="0">
        <Text>{item.description}</Text>
      </Table.Td>
      <Table.Td pl="0">
        <Text>{item.qty}</Text>
      </Table.Td>
      <Table.Td pl="0">
        <Text ta="right">{addCommasToNumber(Number(item.unitPrice))}</Text>
      </Table.Td>
      <Table.Td pl="0">
        <Text>{item.taxRate}%</Text>
      </Table.Td>
      <Table.Td pl="0">
        <Text fw={500} size="sm" ta="right">
          {addCommasToNumber(
            Number(item.qty) * Number(item.unitPrice) +
              (Number(item.qty) *
                Number(item.unitPrice) *
                Number(item.taxRate)) /
                100
          )}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box maw={1200}>
      <Flex gap="md" mt="lg" justify={"space-between"}>
        <Box>
          <Text fw={"bold"}>To</Text>
          <Text>{invoice.customer.name}</Text>
          <Text>{address}</Text>
          <Text>
            Attn: {contact.title}. {contact.name}
          </Text>
        </Box>

        <Flex gap="md">
          <Box>
            <Text fw={"bold"}>Issue Date</Text>
            <Text>{dayjs(invoice.issudate).format("DD MMM YYYY")}</Text>
          </Box>
          <Box>
            <Text fw={"bold"}>Due Date</Text>
            <Text>{dayjs(invoice.duedate).format("DD MMM YYYY")}</Text>
          </Box>
        </Flex>
      </Flex>

      <Table mt="xl" verticalSpacing={"md"} horizontalSpacing={"md"}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th pl="0">Description</Table.Th>
            <Table.Th pl="0">QTY</Table.Th>
            <Table.Th pl="0">Unit Price</Table.Th>
            <Table.Th pl="0">Tax Rate</Table.Th>
            <Table.Th pl="0">Amount($)</Table.Th>
            <Table.Th pl="0"></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {/* 合計のテーブル */}
      <Table withRowBorders={false} maw="60%" mt="xl" ml={"auto"}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Text fw={"bold"}>Subtotal</Text>
            </Table.Td>
            <Table.Td>
              <Text ta="right">
                {addCommasToNumber(Number(invoice.subtotal))}
              </Text>
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Td>
              <Text fw={"bold"}>Spacial Discount</Text>
            </Table.Td>
            <Table.Td>
              <Text ta="right">
                {addCommasToNumber(Number(invoice.discount))}
              </Text>
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Td>
              <Text fw={"bold"}>Total Tax</Text>
            </Table.Td>
            <Table.Td>
              <Text ta="right">
                {addCommasToNumber(Number(invoice.totalTax))}
              </Text>
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Td>
              <Text fw={"bold"}>Total</Text>
            </Table.Td>
            <Table.Td>
              <Text ta="right">
                {addCommasToNumber(Number(invoice.totalAmount))}
              </Text>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default SingleInvoice;
