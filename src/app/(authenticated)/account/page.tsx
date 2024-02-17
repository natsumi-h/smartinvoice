import Account from "@/app/components/User/Account";
import { getSession } from "@/app/lib/action";

const page = () => {
  const session = getSession();
  return <Account session={session} />;
};

export default page;
