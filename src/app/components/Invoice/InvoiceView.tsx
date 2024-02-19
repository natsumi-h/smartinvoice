"use client";
import { Button, Flex, Select } from "@mantine/core";
import InvoiceList from "./InvoiceList";
import StatusCards from "./StatusCards";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";

const InvoiceView = () => {
  const [issueDateRange, setIssueDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [dueDateRange, setDueRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Fetch invoices
  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await fetch("/api/invoice");
      const data = await res.json();
      setInvoices(data.data);
    };
    fetchInvoices();
  }, []);

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch("/api/customer");
      const data = await res.json();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  return (
    <>
      {/* Filter */}
      <Flex mt="md" gap="md" align={"flex-end"} wrap={"wrap"}>
        <Select
          data={customers.map((customer: any) => ({
            label: customer.name,
            value: customer.id.toString(),
          }))}
          placeholder="Pick customer"
          label="Customer"
          searchable
        />
        <DatePickerInput
          type="range"
          //   value={value}
          onChange={setIssueDateRange}
          label="Issue date"
          placeholder="Pick dates"
          valueFormat="DD/MM/YY"
          flex={1}
        />
        <DatePickerInput
          type="range"
          //   value={value}
          onChange={setDueRange}
          label="Due date"
          placeholder="Pick dates"
          valueFormat="DD/MM/YY"
          flex={1}
        />
        <Button>Filter</Button>
        <Button variant={"outline"}>Clear</Button>
      </Flex>

      {/* Cards */}
      <StatusCards invoices={invoices} />

      {/* <Suspense fallback={<Loading />}> */}
      <InvoiceList invoices={invoices} />
      {/* </Suspense> */}
    </>
  );
};

export default InvoiceView;
