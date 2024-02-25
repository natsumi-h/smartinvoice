"use client";
import { Tabs, rem } from "@mantine/core";
import { IconMessageCircle, IconNotes } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import CompanyDetail from "./CompanyDetail";
import Members from "./Member/Members";

type Props = {
  company: {
    id: number;
    name: string;
    uen: string;
    street: string;
    postcode: string;
    phone: string;
    logoUrl: string;
    city: string;
    state: string;
    bankname: string;
    branchname: string;
    swiftcode: string;
    accountname: string;
    accounttype: string;
    bankcode: string;
    branchnumber: string;
    accountnumber: string;
    user: {
      id: number;
      name: string;
      email: string;
      signupDone: boolean;
      role: "Admin" | "User";
    }[];
  };
  members?: {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "User";
    deleted: boolean;
  }[];
};

const CompanyView: FC<Props> = ({ company, members }) => {
  const iconStyle = { width: rem(15), height: rem(15) };
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      defaultValue={pathname === `/company` ? "detail" : "member"}
      mt="lg"
      onChange={(value) =>
        router.push(value === "detail" ? `/company/` : `/company/member`)
      }
    >
      <Tabs.List>
        <Tabs.Tab
          value="detail"
          leftSection={<IconNotes style={iconStyle} />}
          fz="md"
        >
          Details
        </Tabs.Tab>
        <Tabs.Tab
          value="member"
          leftSection={<IconMessageCircle style={iconStyle} />}
          fz="md"
        >
          Members
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="detail" py="lg">
        <CompanyDetail company={company} />
      </Tabs.Panel>

      <Tabs.Panel value="member" py="lg">
        <Members company={company} members={members}/>
      </Tabs.Panel>
    </Tabs>
  );
};

export default CompanyView;
