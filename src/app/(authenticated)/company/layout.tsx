import { getSession } from "@/app/lib/action";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getSession();
  if (session.payload.role !== "Admin") {
    redirect("/signin");
  }

  return <>{children}</>;
};

export default layout;
