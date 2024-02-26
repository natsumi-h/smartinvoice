"use client";
import { Tabs, rem } from "@mantine/core";
import { IconMessageCircle, IconNotes } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import CompanyDetail from "./CompanyDetail";
import Members from "./Member/Members";
import { Company, User } from "@prisma/client";

type Props = {
  company: Company;
  members? : User[];
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
        <Members members={members as User[]} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default CompanyView;
