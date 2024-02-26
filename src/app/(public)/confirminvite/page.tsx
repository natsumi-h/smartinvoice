import ConfirmInvitation from "@/app/components/User/ConfirmInvitation";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <ConfirmInvitation />
    </Suspense>
  );
};

export default page;
