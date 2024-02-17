import CompanyView from "@/app/components/Company/CompanyView";
import { getCompany } from "@/app/lib/data";

const page = async () => {
  const data: any = await getCompany();
  
  return <CompanyView company={data} />;
};

export default page;
