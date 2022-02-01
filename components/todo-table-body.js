import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Tr, Td } from "@chakra-ui/react";

import SButton from "./button/base-button";
import { useRouter } from "next/router";

const TodoTableBody = (props) => {
  const { todos } = props;
  const router = useRouter();

  // Todoの削除
  const onClickDeleteButton = async (docId) => {
    await deleteDoc(doc(db, "todos", docId));
  };

  return (
    <>
      {todos !== undefined &&
        todos.map((todo) => (
          <Tr key={todo.id}>
            <Td>{todo.title}</Td>
            <Td>{todo.status}</Td>
            <Td>
              <SButton
                bg="green"
                onClick={() => {
                  router.push(`/${todo.id}`);
                }}
              >
                詳細
              </SButton>
              <SButton
                bg="blue"
                onClick={() => {
                  router.push(`/${todo.id}/edit`);
                }}
              >
                編集
              </SButton>
              <SButton
                bg="red"
                onClick={() => {
                  onClickDeleteButton(todo.docId);
                }}
              >
                削除
              </SButton>
            </Td>
          </Tr>
        ))}
    </>
  );
};

export default TodoTableBody;
