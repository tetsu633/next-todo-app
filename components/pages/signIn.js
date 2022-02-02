import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react";

const SignInPage = () => {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} width={"full"} maxW="xl">
          <Heading fontSize="2xl">Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email Address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align="start"
              justifyContent="space-between"
            >
              <Checkbox>Remember me</Checkbox>
              <Link color="blue.500">Forgot password?</Link>
            </Stack>
            <Button colorScheme="blue" variant="solid">
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default SignInPage;
