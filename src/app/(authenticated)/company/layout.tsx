import { getSession } from "@/app/lib/action";
import { JWTPayload, JWTVerifyResult } from "jose";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session: JWTVerifyResult<JWTPayload> | null = await getSession();
  if (session?.payload.role !== "Admin") {
    redirect("/signin");
  }

  return <>{children}</>;
};

export default layout;
