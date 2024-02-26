import { Badge, Box, Button, Flex, Title } from "@mantine/core";
import SingleInvoice from "@/app/components/Invoice/SingleInvoice";
import { getInvoice } from "@/app/lib/data";
import Link from "next/link";
import UpdateStatus from "@/app/components/Invoice/UpdateStatus";
import DeleteInvoice from "@/app/components/Invoice/DeleteInvoice";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const invoice = await getInvoice(id);

  return (
    <>
      <Box>
        <Flex justify={"space-between"}>
          <Flex gap="md" align="center">
            <Title order={2}>Invoice</Title>
            <Badge>{invoice.status}</Badge>
            {(invoice.status === "Issued" || invoice.status === "Sent") && (
              <UpdateStatus invoice={invoice} />
            )}
          </Flex>
          <Flex gap="md">
            {invoice.invoiceUrl && (
              <Button
                component={Link}
                href={invoice.invoiceUrl}
                download="download.pdf"
                target="_blank"
              >
                PDF
              </Button>
            )}
            {invoice.status !== "Paid" && (
              <Button
                variant="outline"
                component={Link}
                href={`/invoice/${id}/update`}
              >
                Update
              </Button>
            )}
            {(invoice.status === "Draft" || invoice.status === "Issued") && (
              <DeleteInvoice id={id} />
            )}
          </Flex>
        </Flex>

        <SingleInvoice invoice={invoice} />
      </Box>
    </>
  );
};

export default page;
