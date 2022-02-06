import { useRouter } from "next/router";
import { useContext } from "react";

import { auth } from "../../firebase";
import { Box, Flex, Stack } from "@chakra-ui/react";
import TodoSearch from "../../components/ui/todo-search";
import TodoTable from "../../components/model/todo/todo-table";
import Header from "../ui/header/header";
import SButton from "../ui/button/base-button";
import AppContext from "../../store/context";

const IndexPage = () => {
  const { setCurrentUser } = useContext(AppContext);
  const router = useRouter();

  const onClickSignOutButton = () => {
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
            <SButton bg="red" onClick={() => onClickSignOutButton()}>
              Sign Out
            </SButton>
          </Flex>
          <TodoSearch />
          <TodoTable />
        </Stack>
      </Flex>
    </Box>
  );
};

export default IndexPage;
