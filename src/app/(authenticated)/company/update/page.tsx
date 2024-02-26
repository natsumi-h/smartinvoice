import UpdateCompany from "@/app/components/Company/UpdateCompany";
import { getCompany } from "@/app/lib/data";
import { Box, Title } from "@mantine/core";

const page = async () => {
  const company = await getCompany();

  return (
    <Box>
      <Title order={2}>Update your organization detail.</Title>
      <UpdateCompany company={company}/>
    </Box>
  );
};

export default page;
