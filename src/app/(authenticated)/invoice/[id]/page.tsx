import { Badge, Box, Button, Flex, Title } from "@mantine/core";
import SingleInvoice from "@/app/components/Invoice/SingleInvoice";
import { getInvoice } from "@/app/lib/data";
import Link from "next/link";
import UpdateStatus from "@/app/components/Invoice/UpdateStatus";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const invoice: any = await getInvoice(id);

  return (
    <>
      <Box>
        <Flex justify={"space-between"}>
          <Flex gap="md" align="center">
            <Title order={2}>Invoice</Title>
            <Badge>{invoice.status}</Badge>
            {/* <Button
              variant="outline"
              color="red"
              onClick={() => {
                console.log("delete");
              }}
            >
              Delete
            </Button> */}
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
          </Flex>
        </Flex>

        <SingleInvoice invoice={invoice} />
      </Box>
    </>
  );
};

export default page;
