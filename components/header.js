import { Box, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box backgroundColor="gray.500" p={2} mb={4}>
      <Heading as="h1">NextJS</Heading>
    </Box>
  );
};

export default Header;
