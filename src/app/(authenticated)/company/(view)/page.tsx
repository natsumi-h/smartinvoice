import CompanyView from "@/app/components/Company/CompanyView";
import { getSession } from "@/app/lib/action";
import { getCompany } from "@/app/lib/data";
import { JWTPayload, JWTVerifyResult } from "jose";
import { redirect } from "next/navigation";

const page = async () => {
  const company: any = await getCompany();

  const session: JWTVerifyResult<JWTPayload> | null = await getSession();
  if (session?.payload.role !== "Admin") {
    redirect("/signin");
  }

  return <CompanyView company={company} />;
};

export default page;
