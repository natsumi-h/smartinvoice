import Account from "@/app/components/User/Account";
import { getSession } from "@/app/lib/action";
import { getUser } from "@/app/lib/data";
import { Title } from "@mantine/core";
import { Suspense } from "react";
import { Company, User } from "@prisma/client";
import AccountLoading from "./loading";

const page = async () => {
  const session = await getSession();
  const user = await getUser();

  return (
    <>
      <Title order={2}>Account Profile</Title>
      <Suspense fallback={<AccountLoading />}>
        <Account
          session={session}
          user={
            user as User & {
              company: Company;
            }
          }
        />
      </Suspense>
    </>
  );
};

export default page;
