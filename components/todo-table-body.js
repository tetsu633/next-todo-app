import { Tr, Td, Button } from "@chakra-ui/react";
import Link from "next/link";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const TodoTableBody = (props) => {
  const { todos } = props;

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
              <Link href={`/${todo.id}`}>
                <Button m={2}>詳細</Button>
              </Link>
              <Link href={`/${todo.id}/edit`}>
                <Button m={2}>編集</Button>
              </Link>
              <Button m={2} onClick={() => onClickDeleteButton(todo.docId)}>
                削除
              </Button>
            </Td>
          </Tr>
        ))}
    </>
  );
};

export default TodoTableBody;
