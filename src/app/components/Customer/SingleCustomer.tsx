"use client";

import { Tabs, rem } from "@mantine/core";
import { IconMessageCircle, IconNotes } from "@tabler/icons-react";
import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import Contact from "./Contact/Contact";

type Props = {
  id: string;
  contacts: {
    id: string;
    name: string;
    email: string;
    isPrimary: boolean;
    title: string;
  }[];
};

const SingleCustomer: FC<Props> = ({ contacts, id }) => {
  const iconStyle = { width: rem(12), height: rem(12) };
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      // defaultValue="invoice"
      defaultValue={pathname === `/customer/${id}` ? "invoice" : "contact"}
      mt="lg"
      onChange={(value) =>
        router.push(
          value === "invoice" ? `/customer/${id}/` : `/customer/${id}/${value}`
        )
      }
    >
      <Tabs.List>
        <Tabs.Tab value="invoice" leftSection={<IconNotes style={iconStyle} />}>
          Invoices
        </Tabs.Tab>
        <Tabs.Tab
          value="contact"
          leftSection={<IconMessageCircle style={iconStyle} />}
        >
          Contact
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="invoice" py="lg">
        Invoice tab component
      </Tabs.Panel>

      <Tabs.Panel value="contact" py="lg">
        <Contact contacts={contacts} id={id} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default SingleCustomer;
