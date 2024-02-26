import CompanyView from "@/app/components/Company/CompanyView";
import { getCompany, getMembers } from "@/app/lib/data";
import { Company, User } from "@prisma/client";

const page = async () => {
  const company = await getCompany();
  const members = await getMembers();
  return <CompanyView company={company as Company} members={members as User[]}/>;
};

export default page;
