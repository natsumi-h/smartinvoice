import { Badge, Box, Button, Flex, Title } from "@mantine/core";
import SingleInvoice from "@/app/components/Invoice/SingleInvoice";
import { getInvoice } from "@/app/lib/data";
import Link from "next/link";

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
    <Box>
      <Flex justify={"space-between"}>
        <Flex gap="md" align="center">
          <Title order={2}>Invoice</Title>
          <Badge>{invoice.status}</Badge>
        </Flex>
        <Flex gap="md">
          <Button
            component={Link}
            href={invoice.invoiceUrl}
            download="download.pdf"
            target="_blank"
          >
            PDF
          </Button>
          <Button
            variant="outline"
            component={Link}
            href={`/invoice/${id}/update`}
          >
            Update
          </Button>
        </Flex>
      </Flex>

      <SingleInvoice invoice={invoice} />
    </Box>
  );
};

export default page;
