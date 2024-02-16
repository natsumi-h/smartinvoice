"use client";
import { getSession } from "@/app/lib/action";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import useToast from "@/app/hooks/useToast";
import { useState } from "react";

const Account = () => {
  const { successToast, errorToast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const session: any = await getSession();
      const email = session.payload.email;
      const res = await fetch("/api/user/signout", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        throw new Error("Error");
      }
      //   removeSession();
      setLoading(false);
      router.push("/signin");
      successToast({
        title: "Signout successful",
        message: "You are now signed out.",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleLogout} loading={loading}>
        Logout
      </Button>
    </>
  );
};

export default Account;
