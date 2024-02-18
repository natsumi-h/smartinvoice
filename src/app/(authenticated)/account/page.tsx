import Account from "@/app/components/User/Account";
import { getSession } from "@/app/lib/action";
import { getUser } from "@/app/lib/data";
import { Title } from "@mantine/core";

const page = async () => {
  const session = getSession();
  const user = await getUser();

  return (
    <>
      <Title order={2}>Account Profile</Title>
      <Account session={session} user={user} />
    </>
  );
};

export default page;
