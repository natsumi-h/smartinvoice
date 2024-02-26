"use client";
import {
  Box,
  Button,
  Flex,
  NumberInput,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC, useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import useToast from "@/app/hooks/useToast";
import { addCommasToNumber } from "@/app/lib/addCommas";
import { Customer } from "@prisma/client";

type Props = {
  customers : Customer[];
  invoice: any;
};
const UpdateInvoice: FC<Props> = ({ invoice }) => {
  const router = useRouter();

  const itemInitialValues = invoice.items.reduce(
    (acc: any, item: any, index: number) => {
      acc[`description${index}`] = item.description;
      acc[`qty${index}`] = item.qty;
      acc[`unitPrice${index}`] = item.unitPrice;
      acc[`taxRate${index}`] = item.taxRate === 9 ? "9%" : "No Tax(0%)";
      return acc;
    },
    {}
  );

  const form = useForm({
    initialValues: {
      customer: invoice.customer.name,
      issueDate: new Date(invoice.issueDate),
      dueDate: new Date(invoice.dueDate),
      specialDiscount: Number(invoice.discount),
      ...itemInitialValues,
    },
  });

  const [loadingDraft, setLoadingDraft] = useState<boolean>(false);
  const [loadingIssue, setLoadingIssue] = useState<boolean>(false);
  const { successToast, errorToast } = useToast();
  const [itemLength, setItemLength] = useState<number>(invoice.items.length);
  const [subtotal, setSubtotal] = useState<number>(Number(invoice.subtotal));
  const [totaltax, setTotaltax] = useState<number>(Number(invoice.totalTax));
  const [total, setTotal] = useState<number>(Number(invoice.totalAmount));
  useEffect(() => {
    let newSubtotal = 0.0;
    let newTotaltax = 0.0;
    for (let i = 0; i < itemLength; i++) {
      newSubtotal +=
        (form.values as { [key: string]: any })[`qty${i}`] *
        Number((form.values as { [key: string]: any })[`unitPrice${i}`]);

      newTotaltax +=
        (form.values as { [key: string]: any })[`qty${i}`] *
        Number((form.values as { [key: string]: any })[`unitPrice${i}`]) *
        ((form.values as { [key: string]: any })[`taxRate${i}`] === "9%"
          ? 0.09
          : 0);
    }
    setSubtotal(Number(newSubtotal));
    setTotaltax(Number(newTotaltax));
    let newTotal =
      newSubtotal + newTotaltax - Number(form.values.specialDiscount);
    setTotal(Number(newTotal.toFixed(2)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values, itemLength]);

  const handleSubmit = async (type: "issue" | "draft" | "update") => {
    const values: Record<string, unknown> = form.values;
    try {
      type === "draft" ? setLoadingDraft(true) : setLoadingIssue(true);
      const itemValues = [];
      for (let i = 0; i < itemLength; i++) {
        itemValues.push({
          description: values[`description${i}`],
          qty: values[`qty${i}`],
          unitPrice: values[`unitPrice${i}`],
          taxRate: values[`taxRate${i}`] === "9%" ? 9 : 0,
          amount: (
            (values[`qty${i}`] as number) *
            Number(values[`unitPrice${i}`]) *
            (values[`taxRate${i}`] === "9%" ? 1.09 : 1)
          ).toFixed(2),
        });
      }

      const payload = {
        requestType: type,
        issueDate: values.issueDate,
        dueDate: values.dueDate,
        items: itemValues,
        subtotal: subtotal,
        discount: values.specialDiscount,
        totalTax: totaltax,
        totalAmount: total,
      };

      const response = await fetch(`/api/invoice/${invoice.id}`, {
        method: "POST",
        body: JSON.stringify({
          payload,
        }),
      });
      const data = await response.json();
      console.log(data);
      router.push(`/invoice/${data.data.id}`);
      router.refresh();
      successToast({
        title: "Invoice updated",
        message: "Invoice has been updated successfully",
      });
      type === "issue" ? setLoadingIssue(false) : setLoadingDraft(false);
    } catch (error) {
      console.log(error);
      type === "issue" ? setLoadingIssue(false) : setLoadingDraft(false);
    }
  };

  const handleAddItem = () => {
    setItemLength((prev) => prev + 1);
    // フォームの状態を更新して新しい項目の初期値をセット
    form.setValues({
      ...form.values,
      [`description${itemLength}`]: "", // 初期値を設定
      [`qty${itemLength}`]: 1,
      [`unitPrice${itemLength}`]: "0.00",
      [`taxRate${itemLength}`]: "9%",
    });
  };

  // InvoiceItem
  const rows = Array.from({ length: itemLength }).map((_, index) => (
    <Table.Tr key={index}>
      <Table.Td pl="0">
        <Textarea
          placeholder="Description"
          resize={"both"}
          autosize
          {...form.getInputProps(`description${index}`)}
        />
      </Table.Td>

      <Table.Td pl="0">
        <NumberInput
          placeholder=""
          min={1}
          defaultValue={2}
          {...form.getInputProps(`qty${index}`)}
        />
      </Table.Td>
      <Table.Td pl="0">
        <TextInput
          placeholder="Unit Price"
          defaultValue="0.00"
          {...form.getInputProps(`unitPrice${index}`)}
        />
      </Table.Td>
      <Table.Td pl="0">
        <Select
          placeholder="Select title"
          data={["9%", "No Tax(0%)"]}
          defaultValue="9%"
          allowDeselect={false}
          {...form.getInputProps(`taxRate${index}`)}
        />
      </Table.Td>
      <Table.Td pl="0">
        <Text fw={500} size="sm" ta={"right"}>
          {addCommasToNumber(
            (form.values as { [key: string]: any })[`qty${index}`] &&
              (form.values as { [key: string]: any })[`unitPrice${index}`] &&
              (form.values as { [key: string]: any })[`taxRate${index}`]
              ? ((
                  form.values as {
                    [key: string]: any;
                  }
                )[`qty${index}`] as number) *
                  Number(
                    (form.values as { [key: string]: any })[`unitPrice${index}`]
                  ) *
                  ((form.values as { [key: string]: any })[
                    `taxRate${index}`
                  ] === "9%"
                    ? 1.09
                    : 1)
              : 0
          )}
        </Text>
      </Table.Td>
      <Table.Td pl="0">
        <UnstyledButton
          onClick={() => {
            setItemLength((prev) => prev - 1);
          }}
        >
          {index !== 0 && (
            <IconTrash
              style={{ width: rem(24), height: rem(24) }}
              color="var(--mantine-color-blue-filled)"
              stroke={1.5}
            />
          )}
        </UnstyledButton>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box maw={1200}>
      <form
      // onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <Flex gap="md" mt="lg" justify={"space-between"}>
          <Stack gap="md">
            <Box>
              <Text fw={"500"} fz={"sm"}>
                To
              </Text>
              <Text>{invoice.customer.name}</Text>
            </Box>
            <Box>
              <Text fw={"500"} fz={"sm"}>
                Attention to
              </Text>
              <Text>
                {invoice.contact.title}. {invoice.contact.name}
              </Text>
            </Box>
          </Stack>

          <Flex gap="md">
            <DateInput
              label="Issue date"
              placeholder="Date input"
              {...form.getInputProps("issueDate")}
            />
            <DateInput
              label="Due date"
              placeholder="Date input"
              {...form.getInputProps("dueDate")}
            />
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
        <Box ta={"left"} mr="md">
          <UnstyledButton
            onClick={() => {
              handleAddItem();
            }}
          >
            <Text c="blue">+ Add item</Text>
          </UnstyledButton>
        </Box>

        {/* 合計のテーブル */}
        <Table withRowBorders={false} maw="60%" mt="xl" ml={"auto"}>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <Text fw={"bold"}>Subtotal</Text>
              </Table.Td>
              <Table.Td>
                <Text ta="right">{addCommasToNumber(subtotal)}</Text>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <Text fw={"bold"}>Spacial Discount</Text>
              </Table.Td>
              <Table.Td>
                <TextInput
                  ta="right"
                  placeholder="500.00"
                  {...form.getInputProps("specialDiscount")}
                ></TextInput>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <Text fw={"bold"}>Total Tax</Text>
              </Table.Td>
              <Table.Td>
                <Text ta="right">{addCommasToNumber(totaltax)}</Text>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <Text fw={"bold"}>Total</Text>
              </Table.Td>
              <Table.Td>
                <Text ta="right">{addCommasToNumber(total)}</Text>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </form>
      <Flex justify="center" mt="xl" gap={"lg"}>
        {invoice.status === "Draft" && (
          <>
            <Button
              fullWidth
              variant="outline"
              loading={loadingDraft}
              disabled={loadingIssue}
              onClick={() => handleSubmit("draft")}
            >
              Save Draft
            </Button>
            <Button
              fullWidth
              loading={loadingIssue}
              disabled={loadingDraft}
              onClick={() => handleSubmit("issue")}
            >
              Issue Invoice
            </Button>
          </>
        )}
        {invoice.status !== "Draft" && (
          <Button
            fullWidth
            loading={loadingIssue}
            onClick={() => handleSubmit("update")}
          >
            Update Invoice
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default UpdateInvoice;
