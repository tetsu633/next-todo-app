import { useContext, useEffect } from "react";

import { onSnapshot, collection, query, where } from "firebase/firestore";
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
import AppContext from "../../../store/context";

const TodoTable = () => {
  const { todos, setTodos, filterText, currentUser } = useContext(AppContext);

  useEffect(() => {
    if (currentUser !== null) {
      const q = query(
        collection(db, "todos"),
        where("userId", "==", currentUser.uid)
      );
      const unsub = onSnapshot(q, (querySnapshot) => {
        setTodos(
          querySnapshot.docs.map((doc) => {
            return { docId: doc.id, ...doc.data() };
          })
        );
      });
      return () => unsub();
    }
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
