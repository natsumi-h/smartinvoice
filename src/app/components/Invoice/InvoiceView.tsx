"use client";
import { Button, Flex, Select } from "@mantine/core";
import InvoiceList from "./InvoiceList";
import StatusCards from "./StatusCards";
import { DatePickerInput } from "@mantine/dates";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import Loading from "@/app/(authenticated)/invoice/loading";

const InvoiceView = () => {
  const [filterLoading, setFilterLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);

  const form = useForm({
    initialValues: {
      customer: null,
      issueDate: [null, null],
      dueDate: [null, null],
    },
  });

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch("/api/customer");
      const data = await res.json();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  // Fetch invoices
  useEffect(() => {
    fetchInvoices({
      customer: null,
      issueDate: [null, null],
      dueDate: [null, null],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInvoices = async (values: any) => {
    try {
      const queryParams = [];

      const { customer, issueDate, dueDate } = values;

      if (customer) queryParams.push(`customer=${customer}`);
      if (issueDate[0] && issueDate[1]) {
        queryParams.push(
          `issueDateStart=${(issueDate[0] as Date).toISOString()}`
        );
        queryParams.push(
          `issueDateEnd=${(issueDate[1] as Date).toISOString()}`
        );
      }
      if (dueDate[0] && dueDate[1]) {
        queryParams.push(`dueDateStart=${(dueDate[0] as Date).toISOString()}`);
        queryParams.push(`dueDateEnd=${(dueDate[1] as Date).toISOString()}`);
      }

      const query = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      const res = await fetch(`/api/invoice${query}`);
      const data = await res.json();
      console.log(data);

      setInvoices(data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = async (values: any) => {
    setFilterLoading(true);
    await fetchInvoices(values);
    setFilterLoading(false);
  };

  const handleClear = async () => {
    setClearLoading(true);
    form.reset();
    await fetchInvoices({
      customer: null,
      issueDate: [null, null],
      dueDate: [null, null],
    });
    setClearLoading(false);
  };

  return (
    <>
      {/* Filter */}
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex mt="md" gap="md" align={"flex-end"} wrap={"wrap"}>
          <Select
            data={customers.map((customer: any) => ({
              label: customer.name,
              value: customer.id.toString(),
            }))}
            placeholder="Pick customer"
            label="Customer"
            searchable
            {...form.getInputProps("customer")}
          />
          <DatePickerInput
            type="range"
            label="Issue date"
            placeholder="Pick dates"
            valueFormat="DD/MM/YY"
            flex={1}
            {...form.getInputProps("issueDate")}
          />
          <DatePickerInput
            type="range"
            label="Due date"
            placeholder="Pick dates"
            valueFormat="DD/MM/YY"
            flex={1}
            {...form.getInputProps("dueDate")}
          />
          <Button type="submit" loading={filterLoading}>
            Filter
          </Button>
          <Button
            variant={"outline"}
            onClick={handleClear}
            loading={clearLoading}
          >
            Clear
          </Button>
        </Flex>
      </form>

      {/* Cards */}
      <StatusCards invoices={invoices} />

      <Suspense fallback={<Loading />}>
        <InvoiceList invoices={invoices} />
      </Suspense>
    </>
  );
};

export default InvoiceView;
