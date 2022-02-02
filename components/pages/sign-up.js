import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const SignUpPage = () => {
  const [cred, setCred] = useState({ mail: "", password: "" });

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} width={"full"} maxW="xl">
          <Stack align={"center"}>
            <Heading fontSize="3xl">Sign up</Heading>
            <FormControl id="email">
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={cred.mail}
                onChange={(e) => setCred({ ...cred, mail: e.target.value })}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={cred.password}
                onChange={(e) => setCred({ ...cred, password: e.target.value })}
              />
            </FormControl>
          </Stack>

          <Stack spacing={6}>
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={() => alert("hoge")}
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user?{" "}
              <Link href="/todos/signin" color="blue.500">
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default SignUpPage;
