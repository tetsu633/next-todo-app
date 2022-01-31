import { useState } from "react";
import Link from "next/link";

import { Box, Button } from "@chakra-ui/react";
import Header from "../components/header";
import TodoSearch from "../components/todo-search";
import TodoTable from "../components/todo-table";

const Todos = () => {
  const [filterText, setFilterText] = useState("");

  return (
    <Box>
      <Header />
      <Link href="/create">
        <Button mt={2}>Create</Button>
      </Link>
      <TodoSearch props={{ setFilterText }} />
      <TodoTable props={{ filterText }} />
    </Box>
  );
};

export default Todos;
