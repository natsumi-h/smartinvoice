"use client";
import { Button, Flex, Select } from "@mantine/core";
import InvoiceList from "./InvoiceList";
import StatusCards from "./StatusCards";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";

const InvoiceView = () => {
  const [filterLoading, setFilterLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      customer: null,
      issueDate: [null, null],
      dueDate: [null, null],
      status: null,
    },
  });

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch("/api/customer");
      const data = await res.json();
      setCustomers(data);
    };

    fetchInvoices({
      customer: null,
      issueDate: [null, null],
      dueDate: [null, null],
      status: null,
    });

    fetchCustomers();
    setLoading(false);
  }, []);

  // Fetch invoices
  useEffect(() => {
    fetchInvoices({
      customer: null,
      issueDate: [null, null],
      dueDate: [null, null],
      status: null,
    });
    setLoading(false);
  }, []);

  const fetchInvoices = async (values: any) => {
    try {
      const queryParams = [];

      const { customer, issueDate, dueDate, status } = values;

      if (customer) queryParams.push(`customer=${customer}`);
      if (status) queryParams.push(`status=${status}`);
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
      status: null,
    });
    setClearLoading(false);
  };

  console.log(loading);

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
          <Select
            data={["Draft", "Issued", "Sent", "Paid"]}
            placeholder="Pick status"
            label="Status"
            {...form.getInputProps("status")}
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
      <StatusCards
        invoices={invoices}
        loading={filterLoading || clearLoading || loading}
      />

      <InvoiceList
        invoices={invoices}
        loading={filterLoading || clearLoading || loading}
      />
    </>
  );
};

export default InvoiceView;
