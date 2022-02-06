import { useRouter } from "next/router";
import { useState } from "react";

import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
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

const SignInPage = () => {
  const [cred, setCred] = useState({ mail: "", password: "" });
  const router = useRouter();

  // サインインボタン押下時の処理
  const onClickSignInButton = async () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, cred.mail, cred.password);
      })
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.log("errorCode", e.errorCode);
        console.log("errorMessage", e.errorMessage);
      });
  };

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
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={onClickSignInButton}
            >
              Sign in
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Signup is Here{" "}
              <Link href="/todos/signup" color="blue.500">
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
