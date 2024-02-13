import InvoiceList from "@/app/components/Invoice/InvoiceList";
import {  Title } from "@mantine/core";

const page = () => {
  return (
    <>
      <Title order={2}>Invoice</Title>
      <InvoiceList />
    </>
  );
};

export default page;
