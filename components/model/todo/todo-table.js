import { useContext, useEffect } from "react";

import AppContext from "../../../store/context";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../../firebase";
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

const TodoTable = () => {
  const { todos, setTodos, filterText } = useContext(AppContext);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "todos"), (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() };
        })
      );
    });
    return () => unsub();
  }, []);

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
              todos !== null && filterText !== ""
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
