import { useRouter } from "next/router";
import { useContext } from "react";

import { auth } from "../../firebase";
import { Box, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import TodoSearch from "../../components/ui/todo-search";
import TodoTable from "../../components/model/todo/todo-table";
import Header from "../ui/header/header";
import SButton from "../ui/button/base-button";
import AppContext from "../../store/context";
import SModal from "../ui/modal/modal";

const IndexPage = () => {
  const { setCurrentUser } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const signOut = () => {
    setCurrentUser(null);
    auth.signOut();
  };

  return (
    <Box maxH={"100vh"}>
      <Header />
      <Flex p={12} direction={"column"} align={"center"}>
        <Stack w={"full"} spacing={4}>
          <Flex justifyContent={"space-between"}>
            <SButton bg="blue" onClick={() => router.push("/create")}>
              新規
            </SButton>
            <SButton bg="red" onClick={onOpen}>
              Sign Out
            </SButton>
            <SModal isOpen={isOpen} onClose={onClose} signOut={signOut} />
          </Flex>
          <TodoSearch />
          <TodoTable />
        </Stack>
      </Flex>
    </Box>
  );
};

export default IndexPage;
