import CompanyView from "@/app/components/Company/CompanyView";
import { getSession } from "@/app/lib/action";
import { getCompany } from "@/app/lib/data";
import { Company } from "@prisma/client";
import { JWTPayload, JWTVerifyResult } from "jose";
import { redirect } from "next/navigation";

const page = async () => {
  const company = await getCompany();

  const session: JWTVerifyResult<JWTPayload> | null = await getSession();
  if (session?.payload.role !== "Admin") {
    redirect("/signin");
  }

  return <CompanyView company={company as Company} />;
};

export default page;
