import { Text, Title } from "@mantine/core";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <Title order={2}>Invoice</Title>
      <Text>Loading...</Text>
    </>
  );
}
