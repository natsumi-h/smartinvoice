import { Title } from "@mantine/core";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Title order={2}>My Organization</Title>
      {children}
    </>
  );
};

export default layout;
