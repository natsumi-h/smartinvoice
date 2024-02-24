import { Box, Loader } from "@mantine/core";

const LoadingSpinner = () => {
  return (
    <Box mx={"auto"} ta={"center"} pt={20}>
      <Loader size={30} />
    </Box>
  );
};

export default LoadingSpinner;
