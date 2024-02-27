import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Title } from "@mantine/core";

const CustomerLoading = () => {
  return (
    <>
      <Title order={2}>Create New Customer</Title>
      <LoadingSpinner />
    </>
  );
};

export default CustomerLoading;
