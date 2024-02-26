"use client";
import { Tabs, rem } from "@mantine/core";
import { IconMessageCircle, IconNotes } from "@tabler/icons-react";
import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import Contact from "./Contact/Contact";
import CustomerInvoice from "./Invoice/CustomerInvoice";
import { Contact as PrismaContact} from "@prisma/client";

type Props = {
  id: string;
  contacts: PrismaContact[];
};

const SingleCustomer: FC<Props> = ({ contacts, id }) => {
  const iconStyle = { width: rem(15), height: rem(15) };
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      defaultValue={pathname === `/customer/${id}` ? "invoice" : "contact"}
      mt="lg"
      onChange={(value) =>
        router.push(
          value === "invoice" ? `/customer/${id}/` : `/customer/${id}/${value}`
        )
      }
    >
      <Tabs.List>
        <Tabs.Tab
          value="invoice"
          leftSection={<IconNotes style={iconStyle} />}
          fz="md"
        >
          Invoices
        </Tabs.Tab>
        <Tabs.Tab
          value="contact"
          leftSection={<IconMessageCircle style={iconStyle} />}
          fz="md"
        >
          Contact
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="invoice" py="lg">
        <CustomerInvoice />
      </Tabs.Panel>

      <Tabs.Panel value="contact" py="lg">
        <Contact contacts={contacts} id={id} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default SingleCustomer;
