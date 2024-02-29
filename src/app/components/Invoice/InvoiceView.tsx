"use client";
import { Button, Flex, Group, Pagination, Select } from "@mantine/core";
import InvoiceList from "./InvoiceList";
import StatusCards from "./StatusCards";
import { DatePickerInput } from "@mantine/dates";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Customer } from "@prisma/client";

type Props = {
  customers: Customer[];
};

const chunk = <T,>(array: T[], size: number): T[][] => {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
};

const InvoiceView: FC<Props> = ({ customers }) => {
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [clearLoading, setClearLoading] = useState<boolean>(false);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  // For Pagination
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedData = chunk(invoices, itemsPerPage);
  const currentPageData = paginatedData[activePage - 1] || [];

  useEffect(() => {
    fetchInvoices({
      customer: null,
      issueDate: [null, null],
      dueDate: [null, null],
      status: null,
    });
  }, []);

  const form = useForm({
    initialValues: {
      customer: null,
      issueDate: [null, null],
      dueDate: [null, null],
      status: null,
    },
  });

  const handleSubmit = useCallback(async (values: Record<string, unknown>) => {
    setFilterLoading(true);
    await fetchInvoices(values);
    setFilterLoading(false);
  }, []);

  const handleClear = useCallback(async () => {
    setClearLoading(true);
    form.reset();
    await fetchInvoices({
      customer: null,
      issueDate: [null, null],
      dueDate: [null, null],
      status: null,
    });
    setClearLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInvoices = async (values: Record<string, unknown>) => {
    try {
      setInvoices([]);
      const queryParams = [];
      const { customer, issueDate, dueDate, status } = values;

      if (typeof customer === "string") {
        queryParams.push(`customer=${encodeURIComponent(customer)}`);
      }
      if (typeof status === "string") {
        queryParams.push(`status=${encodeURIComponent(status)}`);
      }
      if (Array.isArray(issueDate) && issueDate.length === 2) {
        const start = issueDate[0];
        const end = issueDate[1];
        if (start instanceof Date && end instanceof Date) {
          queryParams.push(`issueDateStart=${start.toISOString()}`);
          queryParams.push(`issueDateEnd=${end.toISOString()}`);
        }
      }
      if (Array.isArray(dueDate) && dueDate.length === 2) {
        const start = dueDate[0];
        const end = dueDate[1];
        if (start instanceof Date && end instanceof Date) {
          queryParams.push(`dueDateStart=${start.toISOString()}`);
          queryParams.push(`dueDateEnd=${end.toISOString()}`);
        }
      }

      const query = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      const res = await fetch(`/api/invoice${query}`);
      const data = await res.json();
      setInvoices(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      {/* Filter */}
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex mt="md" gap="md" align={"flex-end"} wrap={"wrap"}>
          <Select
            data={customers.map((customer: Customer) => ({
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

      {/* InvoiceList */}
      <InvoiceList
        invoices={currentPageData}
        loading={filterLoading || clearLoading || loading}
      />

      {/* Pagination */}
      <Group gap={5} justify="center" mt="lg">
        <Pagination
          total={paginatedData.length}
          value={activePage}
          onChange={setPage}
        />
      </Group>
    </>
  );
};

export default InvoiceView;
