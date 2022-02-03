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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const SignInPage = () => {
  const [cred, setCred] = useState({ mail: "", password: "" });

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} width={"full"} maxW="xl">
          <Stack align={"center"}>
            <Heading fontSize="3xl">Sign in to your account</Heading>
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
            <Stack
              direction={{ base: "column", sm: "row" }}
              align="start"
              justifyContent="space-between"
            >
              <Checkbox>Remember me</Checkbox>
              <Link color="blue.500">Forgot password?</Link>
            </Stack>
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={() => alert("hoge")}
            >
              Sign up
            </Button>
          </Stack>

          <Stack spacing={6}>
            <Text align={"center"}>
              Signup is Here{" "}
              <Link color="blue.500" href="/todos/signup">
                SignUp
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default SignInPage;
