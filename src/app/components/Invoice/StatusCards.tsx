import { Card, Flex, Text } from "@mantine/core";
import styles from "./StatusCards.module.css";
import { FC } from "react";
import { addCommasToNumber } from "@/app/lib/addCommas";

type Props = {
  invoices: any;
};

const StatusCards: FC<Props> = ({ invoices }) => {
const draftAmt = addCommasToNumber(invoices
  .filter((invoice: any) => invoice.status === "Draft")
  .reduce(
    (acc: number, invoice: any) => acc + parseFloat(invoice.totalAmount),
    0
  ));
const issuedAmt = addCommasToNumber(
  invoices
    .filter((invoice: any) => invoice.status === "Issued")
    .reduce(
      (acc: number, invoice: any) => acc + parseFloat(invoice.totalAmount),
      0
    )
);
const sentAmt = addCommasToNumber(
  invoices
    .filter((invoice: any) => invoice.status === "Sent")
    .reduce(
      (acc: number, invoice: any) => acc + parseFloat(invoice.totalAmount),
      0
    )
);
const paidAmt = addCommasToNumber(
  invoices
    .filter((invoice: any) => invoice.status === "Paid")
    .reduce(
      (acc: number, invoice: any) => acc + parseFloat(invoice.totalAmount),
      0
    )
);


  return (
    <Flex gap={"lg"} justify={"flex-start"} mt={"xl"} wrap={"wrap"}>
      <Card padding="lg" radius="md" withBorder className={styles.card}>
        <Text fw={"bold"} c={"blue"} fz={"sm"}>
          Draft
        </Text>
        <Text fw={"bold"} fz={"xl"}>
          ${draftAmt}
        </Text>
      </Card>
      <Card padding="lg" radius="md" withBorder className={styles.card}>
        <Text fw={"bold"} c={"blue"} fz={"sm"}>
          Issued
        </Text>
        <Text fw={"bold"} fz={"xl"}>
          ${issuedAmt}
        </Text>
      </Card>
      <Card padding="lg" radius="md" withBorder className={styles.card}>
        <Text fw={"bold"} c={"blue"} fz={"sm"}>
          Sent
        </Text>
        <Text fw={"bold"} fz={"xl"}>
          ${sentAmt}
        </Text>
      </Card>
      <Card padding="lg" radius="md" withBorder className={styles.card}>
        <Text fw={"bold"} c={"blue"} fz={"sm"}>
          Paid
        </Text>
        <Text fw={"bold"} fz={"xl"}>
          ${paidAmt}
        </Text>
      </Card>
    </Flex>
  );
};

export default StatusCards;
