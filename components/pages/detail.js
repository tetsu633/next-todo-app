import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import AppContext from "../../store/context";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import Header from "../header";
import SButton from "../button/base-button";

const Detail = ({ todoId }) => {
  const { todos } = useContext(AppContext);
  const [todo, setTodo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const targetIndex = todos.findIndex((todo) => todo.id === Number(todoId));
    setTodo(todos[targetIndex]);
  }, []);

  // 削除ボタン押下時の処理
  const onClickDeleteButton = async (docId) => {
    await deleteDoc(doc(db, "todos", docId)).then(
      router.push("/").catch((e) => console.log(e))
    );
  };

  // 戻るボタン押下時の処理
  const onClickReturnButton = () => {
    router.push("/");
  };

  return (
    <Box>
      <Header />
      {todo !== undefined && todo !== null && (
        <>
          <Stack>
            <FormControl isReadOnly>
              <Flex px={16}>
                <FormLabel w={16}>Title</FormLabel>
                <Input value={todo.title} userSelect="none" />
              </Flex>
            </FormControl>
            <FormControl isReadOnly>
              <Flex px={16}>
                <FormLabel w={16}>Detail</FormLabel>
                <Textarea value={todo.detail} userSelect="none" />
              </Flex>
            </FormControl>
            <FormControl isReadOnly>
              <Flex px={16}>
                <FormLabel w={16}>Status</FormLabel>
                <Input w={32} value={todo.status} userSelect="none" />
              </Flex>
            </FormControl>
            <Flex justifyContent="right">
              <SButton bg="blue" onClick={() => onClickReturnButton()}>
                戻る
              </SButton>
              <SButton bg="red" onClick={() => onClickDeleteButton(todo.docId)}>
                削除
              </SButton>
              <SButton
                bg="green"
                onClick={() => router.push(`/${todo.id}/edit`)}
              >
                編集
              </SButton>
            </Flex>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Detail;
