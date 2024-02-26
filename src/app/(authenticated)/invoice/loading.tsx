import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Title } from "@mantine/core";

export default function Loading() {
  return (
    <>
      <Title order={2}>Invoice</Title>
      <LoadingSpinner />
    </>
  );
}
