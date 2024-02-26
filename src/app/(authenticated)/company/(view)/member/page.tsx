import CompanyView from "@/app/components/Company/CompanyView";
import { getCompany, getMembers } from "@/app/lib/data";

const page = async () => {
  const company: any = await getCompany();
  const members: any = await getMembers();
  return <CompanyView company={company} members={members}/>;
};

export default page;
