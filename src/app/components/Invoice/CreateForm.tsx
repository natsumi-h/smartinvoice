import {
  Box,
  Button,
  Flex,
  NumberInput,
  Select,
  Table,
  Text,
  TextInput,
  Textarea,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { PdfComponent } from "../Pdf/PdfComponent";
import { renderToString } from "react-dom/server";
import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      specialDiscount: "0.0",
      qty0: 1,
      unitPrice0: "0.00",
      taxRate0: "9%",
    },
    // validate: (values) => {
    //   const errors: any = {};
    //   // 既存のバリデーション
    //   if (!values.customer) errors.customer = "Customer is required";
    //   if (!values.issueDate) errors.issueDate = "Issue date is required";
    //   if (!values.dueDate) errors.dueDate = "Due date is required";
    //   // 動的フィールドのバリデーション
    //   for (let i = 0; i < itemLength; i++) {
    //     if (!values[`description-${i}`]) {
    //       errors[`description-${i}`] = "Description is required";
    //     }
    //     if (!values[`qty-${i}`]) {
    //       errors[`qty-${i}`] = "Quantity is required";
    //     }
    //     if (!values[`unitPrice-${i}`]) {
    //       errors[`unitPrice-${i}`] = "Unit price is required";
    //     }
    //     if (!values[`taxRate-${i}`]) {
    //       errors[`taxRate-${i}`] = "Tax rate is required";
    //     }
    //   }
    //   return errors;
    // },
  });

  // console.log(form.values);
  const [itemLength, setItemLength] = useState<number>(1);
  const [subtotal, setSubtotal] = useState<number>(0.0);
  const [totaltax, setTotaltax] = useState<number>(0.0);
  const [total, setTotal] = useState<number>(0.0);
  useEffect(() => {
    let newSubtotal = 0;
    let newTotaltax = 0;
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
    setSubtotal(Number(newSubtotal.toFixed(2)));
    setTotaltax(Number(newTotaltax.toFixed(2)));

    let newTotal =
      newSubtotal + newTotaltax - Number(form.values.specialDiscount);
    setTotal(Number(newTotal.toFixed(2)));
  }, [form.values, itemLength]);

  const handleSubmit = async (values: any) => {
    try {
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
      console.log(itemValues);

      const payload = {
        customer: "customer name",
        issueDate: values.issueDate,
        dueDate: values.dueDate,
        items: itemValues,
        subtotal: subtotal,
        discount: values.specialDiscount,
        totalTax: totaltax,
        total: total,
      };
      console.log(payload);

      const renderComponentToHtml = () => {
        return renderToString(<PdfComponent props={payload} />);
      };
      console.log(renderComponentToHtml());

      const response = await fetch("/api/invoice", {
        method: "POST",
        body: JSON.stringify({
          html: renderComponentToHtml(),
          payload: payload,
        }),
      });

      const data = await response.json();
      console.log(data);
      router.push(`/invoice/${data.data.id}`);
    } catch (error) {
      console.log(error);
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
          {(form.values as { [key: string]: any })[`qty${index}`] &&
          (form.values as { [key: string]: any })[`unitPrice${index}`] &&
          (form.values as { [key: string]: any })[`taxRate${index}`]
            ? (
                ((
                  form.values as {
                    [key: string]: any;
                  }
                )[`qty${index}`] as number) *
                Number(
                  (form.values as { [key: string]: any })[`unitPrice${index}`]
                ) *
                ((form.values as { [key: string]: any })[`taxRate${index}`] ===
                "9%"
                  ? 1.09
                  : 1)
              ).toFixed(2)
            : "0.00"}
        </Text>
      </Table.Td>
      <Table.Td pl="0">
        <UnstyledButton
          onClick={() => {
            setItemLength((prev) => prev - 1);
          }}
        >
          <IconTrash
            style={{ width: rem(24), height: rem(24) }}
            color="var(--mantine-color-blue-filled)"
          />
        </UnstyledButton>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box maw={1200}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex gap="md" mt="lg">
          {/* TODO:先にデータフェッチしておく */}
          <Select
            label="To"
            placeholder="Custom layout"
            data={["React", "Angular", "Vue", "Svelte"]}
            searchable
            limit={5}
            {...form.getInputProps("customer")}
          />
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

        <Box maw="60%" ta={"right"} ml={"auto"} mt="xl">
          <Flex gap="md" justify={"flex-end"} align="center">
            <Text>Subtotal</Text>
            <Text>{subtotal}</Text>
          </Flex>
          <Flex gap="md" justify={"flex-end"} align="center" mt="md">
            <Text>Special Discount</Text>
            <TextInput
              ta={"right"}
              placeholder="500.00"
              {...form.getInputProps("specialDiscount")}
            ></TextInput>
          </Flex>
          <Flex gap="md" justify={"flex-end"} align="center" mt="md">
            <Text>Total Tax</Text>
            <Text>{totaltax}</Text>
          </Flex>

          <Flex gap="md" justify={"flex-end"} align="center" mt="md">
            <Text>Total</Text>
            <Text>{total}</Text>
          </Flex>
        </Box>

        <Flex justify="center" mt="xl" gap={"lg"}>
          <Button fullWidth type="submit" variant="outline">
            Save Draft
          </Button>
          <Button fullWidth type="submit">
            Submit for approval
          </Button>
          {/* <Button fullWidth type="submit">
            Create
          </Button> */}
        </Flex>
      </form>
    </Box>
  );
};

export default CreateForm;
