import { useContext } from "react";

import AppContext from "../../../store/context";
import {
  Box,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import TodoTableBody from "./todo-table-body";

const TodoTable = ({ props }) => {
  const { todos } = useContext(AppContext);
  const { filterText } = props;

  return (
    <Box>
      <Table variant="simple">
        <TableCaption>NextJS Todo App</TableCaption>
        <Thead>
          <Tr>
            <Th>タイトル</Th>
            <Th>ステータス</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <TodoTableBody
            todos={
              todos !== undefined && filterText !== ""
                ? todos.filter((todo) => {
                    return todo.title.includes(filterText);
                  })
                : todos
            }
          />
        </Tbody>
      </Table>
    </Box>
  );
};

export default TodoTable;
