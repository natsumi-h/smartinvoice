import Account from "@/app/components/User/Account";
import { getSession } from "@/app/lib/action";
import { getUser } from "@/app/lib/data";
import { Title } from "@mantine/core";
import { Company, User } from "@prisma/client";

const page = async () => {
  const session = await getSession();
  const user = await getUser();

  return (
    <>
      <Title order={2}>Account Profile</Title>
      <Account
        session={session}
        user={
          user as User & {
            company: Company;
          }
        }
      />
    </>
  );
};

export default page;
