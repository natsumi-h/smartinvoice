import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Title } from "@mantine/core";

const loading = () => {
  return (
    <>
      <Title order={2}>New Invoice</Title>
      <LoadingSpinner />
    </>
  );
};

export default loading;
