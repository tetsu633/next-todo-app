import { useState } from "react";
import { useRouter } from "next/router";

import { Box } from "@chakra-ui/react";
import TodoSearch from "../../components/ui/todo-search";
import TodoTable from "../../components/model/todo/todo-table";
import Header from "../ui/header/header";
import SButton from "../ui/button/base-button";

const IndexPage = () => {
  const [filterText, setFilterText] = useState("");
  const router = useRouter();

  return (
    <Box>
      <Header />
      <Box px={8}>
        <SButton bg="blue" onClick={() => router.push("/create")}>
          新規
        </SButton>
        <TodoSearch props={{ setFilterText }} />
        <TodoTable props={{ filterText }} />
      </Box>
    </Box>
  );
};

export default IndexPage;
