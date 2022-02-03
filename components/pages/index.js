import { useRouter } from "next/router";

import { Box, Flex, Stack } from "@chakra-ui/react";
import TodoSearch from "../../components/ui/todo-search";
import TodoTable from "../../components/model/todo/todo-table";
import Header from "../ui/header/header";
import SButton from "../ui/button/base-button";

const IndexPage = () => {
  const router = useRouter();

  return (
    <Box maxH={"100vh"}>
      <Header />
      <Flex p={12} direction={"column"} align={"center"}>
        <Stack w={"full"} spacing={4}>
          <SButton bg="blue" onClick={() => router.push("/create")}>
            新規
          </SButton>
          <TodoSearch />
          <TodoTable />
        </Stack>
      </Flex>
    </Box>
  );
};

export default IndexPage;
