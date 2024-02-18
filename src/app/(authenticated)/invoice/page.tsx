import InvoiceList from "@/app/components/Invoice/InvoiceList";
import { Title } from "@mantine/core";
// import { Suspense } from "react";
// import Loading from "./loading";

const page = () => {
  return (
    <>
      <Title order={2}>Invoice</Title>
      {/* <Suspense fallback={<Loading />}> */}
      <InvoiceList />
      {/* </Suspense> */}
    </>
  );
};

export default page;
