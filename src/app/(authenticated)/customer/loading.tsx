import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Title } from "@mantine/core";

const CustomerLoading = () => {
  return (
    <>
      <Title order={2}>Customers</Title>
      <LoadingSpinner />
    </>
  );
};

export default CustomerLoading;
