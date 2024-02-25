import ConfirmSignup from "@/app/components/User/ConfirmSignup";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <ConfirmSignup />
    </Suspense>
  );
};

export default page;
