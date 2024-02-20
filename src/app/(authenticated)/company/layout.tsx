import { getSession } from "@/app/lib/action";
import { redirect } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const session: any = getSession();
  if (session.payload.role !== "Admin") {
    redirect("/signin");
  }

  return <>{children}</>;
};

export default layout;
