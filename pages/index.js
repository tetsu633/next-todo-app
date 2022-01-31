import { useState } from "react";

import { Box } from "@chakra-ui/react";
import Header from "../components/header";
import TodoSearch from "../components/todo-search";
import TodoTable from "../components/todo-table";
import CreateButton from "../components/button/create-button";

const Todos = () => {
  const [filterText, setFilterText] = useState("");

  return (
    <Box>
      <Header />
      <Box px={8}>
        <CreateButton>新規作成</CreateButton>
        <TodoSearch props={{ setFilterText }} />
        <TodoTable props={{ filterText }} />
      </Box>
    </Box>
  );
};

export default Todos;
