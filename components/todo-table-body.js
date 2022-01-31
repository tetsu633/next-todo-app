import { Tr, Td } from "@chakra-ui/react";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import DeleteButton from "./button/delete-button";
import EditButton from "./button/edit-button";
import DetailButton from "./button/detail-button";

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
              <DetailButton todoId={todo.id}>詳細</DetailButton>
              <EditButton todoId={todo.id}>編集</EditButton>
              <DeleteButton
                onClickEvent={() => onClickDeleteButton(todo.docId)}
              >
                削除
              </DeleteButton>
            </Td>
          </Tr>
        ))}
    </>
  );
};

export default TodoTableBody;
