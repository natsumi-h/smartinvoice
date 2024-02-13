import { Title } from "@mantine/core";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const data = await getCustomer();
  return (
    <>
      <Title order={2}>My Team</Title>
      {children}
    </>
  );
};

export default layout;
