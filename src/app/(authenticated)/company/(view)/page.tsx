import CompanyView from "@/app/components/Company/CompanyView";
import { getSession } from "@/app/lib/action";
import { getCompany } from "@/app/lib/data";
import { redirect } from "next/navigation";

const page = async () => {
  const company: any = await getCompany();

  const session: any = await getSession();
  if (!session || session.payload.role !== "Admin") {
    return redirect("/signin");
  }

  return <CompanyView company={company} />;
};

export default page;
