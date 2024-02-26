import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Title } from "@mantine/core";

const AccountLoading = () => {
  return (
    <>
      <Title order={2}>Account Profile</Title>
      <LoadingSpinner />
    </>
  );
};

export default AccountLoading;
